<template>
  <main>
    <div v-if="!giftAdd" class="gift">
      <div class="inputgroupe__search">
        <div>
          <input
            v-model.trim="searchText"
            type="text" placeholder="Поиск..."
            class="bg-bg border-turq"
          >
        </div>
        <div>
          <VButton class="bg-turq" @click="giftAdd = !giftAdd">
            +
          </VButton>
        </div>
      </div>
      <div
        v-for="gift in giftsFilter"
        :key="gift.id" class="border-turq gift__item"
        @click="openInfo(gift.id)"
      >
        <div class="gift__title">
          <div class="bg-turq flex-center">
            {{ gift.name }}
          </div>
          <div class="flex-center">
            {{ gift.count }}
          </div>
          <RouterLink v-if="isOpenGift(gift.id)" :to="{ name: 'Gift', params: { id: gift.id } }">
            <VButton class="bg-turq">
              Подробнее
            </VButton>
          </RouterLink>
        </div>
        <div class="gift__btns" />
      </div>
    </div>
    <GiftAdd v-else @add="addGift()" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGiftsStore } from '../stores/gifts';
import GiftAdd from '../components/Forms/GiftAdd.vue';

const giftAdd = ref(false);
const searchText = ref('');
const isOpen = ref(new Set());

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

function addGift() {
  giftAdd.value = false;
}
</script>
