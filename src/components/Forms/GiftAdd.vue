<template>
  <form class="persona__edit">
    <span>Название:</span>
    <input v-model.trim="giftName" type="text" placeholder="Название" class="bg-bg border-turq">
    <span>Количество:</span>
    <input
      v-model.trim="giftCount"
      type="number"
      placeholder="Количество"
      class="bg-bg border-turq"
    >
    <VButton class="bg-turq" @click="submitForm()">
      Добавить
    </VButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IGift } from '../../types/types.ts';
import { useGiftsStore } from '../../stores/gifts.ts';


const emit = defineEmits<{
  add: [];
}>();

const giftName = ref('');
const giftCount = ref(0);


async function submitForm() {
  const endObj: IGift = {
    name : giftName.value,
    count: giftCount.value,
  };
  await useGiftsStore().addGift(endObj);
  emit('add');
}
</script>
