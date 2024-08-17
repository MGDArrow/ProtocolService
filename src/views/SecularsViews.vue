<template>
  <main>
    <div v-if="!secularAdd" class="seculars">
      <div class="inputgroupe__search">
        <div>
          <input
            v-model.trim="searchText"
            type="text" placeholder="Поиск..."
            class="bg-bg border-purple"
          >
        </div>
        <div>
          <VButton class="bg-purple" @click="secularAdd = !secularAdd">
            +
          </VButton>
        </div>
      </div>
      <SecularItem
        v-for="secular in secularsFilter" :key="secular.id"
        :secular="secular" :isOpen="isOpenSecular(secular.id)"
        @click="openInfo(secular.id)"
      />
    </div>
    <SecularAdd v-else @add="addSecular()" />
  </main>
</template>

<script setup lang="ts">
import SecularItem from '@/components/SecularItem.vue';
import { ref, computed } from 'vue';
import { useSecularsStore } from '../stores/seculars.ts';
import { Database } from '../types/supabase.ts';
import VButton from '@/components/UI/VButton.vue';
import SecularAdd from '@/components/Forms/SecularAdd.vue';


const searchText = ref('');

const isOpen = ref(new Set());

const seculars = computed(() => useSecularsStore().seculars);

const secularAdd = ref(false);


const secularsFilter = computed(() => {
  if (searchText.value === '' || seculars.value === null) return seculars.value;
  return seculars.value.filter(secular => getTitle(secular).toLowerCase()
    .search(new RegExp(searchText.value.toLowerCase(), 'gi')) !== -1);
});

function openInfo(index: number) {
  if (isOpen.value.has(index)) isOpen.value.delete(index);
  else isOpen.value.add(index);
}

function isOpenSecular(index: number) {
  return isOpen.value.has(index);
}

function getTitle(secular: Database['public']['Tables']['SECULARS']['Row']) {
  let title = '';
  title += secular.name_second ? secular.name_second : '';
  title += secular.name_first  ? ` ${secular.name_first}` :  '';
  title += secular.name_father ? ` ${secular.name_father}` : '';
  return title;
}

function addSecular() {
  secularAdd.value = false;
}
</script>
