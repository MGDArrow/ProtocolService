<template>
  <div class="protocol-service">
    <TheMenu />
    <div class="the-body">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheMenu from '@components/TheMenu.vue';
import { onMounted } from 'vue';
import { usePriestsStore } from '../stores/priests';
import { useBishopsStore } from '../stores/bishops';
import { useSecularsStore } from '../stores/seculars';
import { useGiftsStore } from '../stores/gifts';

onMounted(async() => {
  await usePriestsStore().getPriestsFromDB();
  await useBishopsStore().getBishopsFromDB();
  await useSecularsStore().getSecularsFromDB();
  await useGiftsStore().getGiftsFromDB();
  await useGiftsStore().getHistoryFromDB();
});
</script>

<style lang="scss" scoped>
  .the-body {
    height: 92dvh;
    margin-top: 6dvh;
    overflow: auto;
  }
</style>
