<template>
  <main>
    <div v-if="!bishopAdd" class="bishops">
      <div class="inputgroupe__search">
        <div>
          <input
            v-model.trim="searchText"
            type="text" placeholder="Поиск..."
            class="bg-bg border-blue"
          >
        </div>
        <div>
          <VButton class="bg-blue" @click="bishopAdd = !bishopAdd">
            +
          </VButton>
        </div>
      </div>
      <BishopItem
        v-for="bishop in bishopsFilter" :key="bishop.id"
        :bishop="bishop" :isOpen="isOpenBishop(bishop.id)"
        @click="openInfo(bishop.id)"
      />
    </div>
    <BishopAdd v-else @add="addBishop()" />
  </main>
</template>

<script setup lang="ts">
import BishopItem from '@components/BishopItem.vue';
import { ref, computed } from 'vue';
import { useBishopsStore } from '../stores/bishops.ts';
import { Database } from '../types/supabase.ts';
import BishopAdd from '../components/Forms/BishopAdd.vue';

const searchText = ref('');
const bishops = computed(() => useBishopsStore().bishops);
const isOpen = ref(new Set());
const bishopAdd = ref(false);

function openInfo(index: number) {
  if (isOpen.value.has(index)) isOpen.value.delete(index);
  else isOpen.value.add(index);
}

function isOpenBishop(index: number) {
  return isOpen.value.has(index);
}

const bishopsFilter = computed(() => {
  if (searchText.value === '' || bishops.value === null) return bishops.value;
  return bishops.value.filter(bishop => getTitle(bishop).toLowerCase()
    .search(new RegExp(searchText.value.toLowerCase(), 'gi')) !== -1);
});

function getTitle(bishop: Database['public']['Tables']['BISHOPS']['Row']) {
  let title = '';
  title += bishop.name_monk ? bishop.name_monk : '';
  title += bishop.title ? ` ${bishop.title}` : '';

  return title;
}

function addBishop() {
  bishopAdd.value = false;
}
</script>
