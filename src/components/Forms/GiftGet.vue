<template>
  <input
    v-model.trim="searchText"
    type="text" placeholder="Поиск..."
    class="bg-bg border-turq"
  >
  <div
    v-for="gift in giftsFilter"
    :key="gift.id" class="border-turq gift__item"
  >
    <div class="gift__title">
      <div class="bg-turq flex-center" @click="openInfo(gift.id)">
        {{ gift.name }}
      </div>
      <div class="flex-center">
        {{ gift.count }}
      </div>
      <div v-if="isOpenGift(gift.id)" class="inputgroupe__search">
        <div>
          <input
            v-model.trim="giftCount"
            type="number" :max="gift.count"
            placeholder="Поиск..."
            class="bg-bg border-turq"
          >
        </div>
        <div style="width: 40%;">
          <VButton class="bg-turq" @click="getGift(gift.id)">
            Подарить
          </VButton>
        </div>
      </div>
    </div>
    <div class="gift__btns" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGiftsStore } from '../../stores/gifts';
import VButton from '../UI/VButton.vue';

const emit = defineEmits<{
  getGift: [{ giftId: number; giftCount: number }];
}>();

const searchText = ref('');
const isOpen = ref(new Set());
const giftCount = ref(0);

const gifts = computed(() => useGiftsStore().gifts);

const giftsFilter = computed(() => {
  if (searchText.value === '' || gifts.value === null) return gifts.value;
  return gifts.value.filter(gift => gift.name.toLowerCase()
    .search(new RegExp(searchText.value.toLowerCase(), 'gi')) !== -1);
});
function openInfo(index: number) {
  if (isOpen.value.has(index)) isOpen.value.delete(index);
  else isOpen.value.add(index);
}

function isOpenGift(index: number) {
  return isOpen.value.has(index);
}

function getGift(giftId:number) {
  emit('getGift', { giftId, giftCount: giftCount.value });
}
</script>
