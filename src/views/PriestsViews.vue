<template>
  <main>
    <div v-if="!priestAdd" class="priests">
      <div class="inputgroupe__search">
        <div>
          <input
            v-model.trim="searchText"
            type="text" placeholder="Поиск..."
            class="bg-bg border-orange"
          >
        </div>
        <div>
          <VButton class="bg-orange" @click="priestAdd = !priestAdd">
            +
          </VButton>
        </div>
      </div>
      <PriestItem
        v-for="priest in priestsFilter" :key="priest.id"
        :priest="priest" :isOpen="isOpenPriest(priest.id)"
        @click="openInfo(priest.id)"
      />
    </div>
    <PriestAdd v-else @add="addPriest()" />
  </main>
</template>

<script setup lang="ts">
import PriestItem from '@/components/PriestItem.vue';
import { ref, computed } from 'vue';
import { usePriestsStore } from '../stores/priests.ts';
import { Database } from '../types/supabase.ts';
import VButton from '@/components/UI/VButton.vue';
import PriestAdd from '@/components/Forms/PriestAdd.vue';


const searchText = ref('');

const isOpen = ref(new Set());

const priests = computed(() => usePriestsStore().priests);

const priestAdd = ref(false);


const priestsFilter = computed(() => {
  if (searchText.value === '' || priests.value === null) return priests.value;
  return priests.value.filter(prist => getTitle(prist).toLowerCase()
    .search(new RegExp(searchText.value.toLowerCase(), 'gi')) !== -1);
});

function openInfo(index: number) {
  if (isOpen.value.has(index)) isOpen.value.delete(index);
  else isOpen.value.add(index);
}

function isOpenPriest(index: number) {
  return isOpen.value.has(index);
}

function getTitle(priest: Database['public']['Tables']['PRIESTS']['Row']) {
  let title = '';
  title += priest.title ? priest.title : '';
  title += priest.name_monk ? ` ${priest.name_monk}` : '';
  title += priest.name_first && priest.name_monk ? ` (${priest.name_first})` : priest.name_first ? ` ${priest.name_first}` : '';
  title += priest.name_father ? ` ${priest.name_father}` : '';
  title += priest.name_second ? ` ${priest.name_second}` : '';

  return title;
}

function addPriest() {
  priestAdd.value = false;
}
</script>
