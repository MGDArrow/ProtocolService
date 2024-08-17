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
      Изменить
    </VButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Database } from '../../types/supabase.ts';
import { useGiftsStore } from '../../stores/gifts.ts';
interface Props {
  gift: Database['public']['Tables']['GIFTS']['Row'] | undefined;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  edit: [];
}>();

const giftName = ref(props.gift?.name ?? '');
const giftCount = ref(props.gift?.count ?? 0);

async function submitForm() {
  const endObj: Database['public']['Tables']['GIFTS']['Row'] = {
    name : giftName.value,
    count: giftCount.value,
    id   : props.gift?.id ?? 0,
  };
  await useGiftsStore().changeGiftInfo(endObj.id, endObj);
  emit('edit');
}
</script>
