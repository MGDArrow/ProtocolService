<template>
  <div v-if="giftInfo && !giftEdit" class="persona">
    <div class="gift__title">
      <div class="bg-turq flex-center">
        {{ giftInfo.name }}
      </div>
      <div class="flex-center">
        {{ giftInfo.count }}
      </div>
    </div>
    <div class="persona__buttons">
      <VButton class="bg-orange" @click="giftEdit = true">
        Изменить данные
      </VButton>
    </div>
    <h2 class="color-turq">
      История дарения:
    </h2>
    <div v-for="gift in gifts" :key="gift.id" class="gift__history">
      <BishopItem
        v-if="gift.bishop_id"
        :bishop="useBishopsStore().findBishop(gift.bishop_id)" :isOpen="isOpen(`b${gift.id}`)"
        class="border-blue"
        @click="openInfo(`b${gift.id}`)"
      />
      <PriestItem
        v-if="gift.priest_id"
        :priest="usePriestsStore().findPriest(gift.priest_id)" :isOpen="isOpen(`p${gift.id}`)"
        class="border-orange"
        @click="openInfo(`p${gift.id}`)"
      />
      <SecularItem
        v-if="gift.secular_id"
        :secular="useSecularsStore().findSecular(gift.secular_id)" :isOpen="isOpen(`s${gift.id}`)"
        class="border-purple"
        @click="openInfo(`s${gift.id}`)"
      />
    </div>
  </div>
  <GiftEdit
    v-else-if="giftEdit && giftInfo"
    :gift="giftInfo"
    @edit="() => editGift()"
  />
  <VButton
    v-else
    class="bg-grey"
    @click="reloadPage()"
  >
    Перезагрузить страницу
  </VButton>
</template>

<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useSecularsStore } from '../stores/seculars.ts';
import { onMounted, Ref, ref } from 'vue';
import { IHistory } from '../types/types.ts';
import { useGiftsStore } from '../stores/gifts.ts';
import BishopItem from '@components/BishopItem.vue';
import PriestItem from '@components/PriestItem.vue';
import SecularItem from '@components/SecularItem.vue';
import { useBishopsStore } from '../stores/bishops.ts';
import { usePriestsStore } from '../stores/priests.ts';
import GiftEdit from '../components/Forms/GiftEdit.vue';
import { Database } from '../types/supabase.ts';

const id = ref(0);
const gifts: Ref<Array<IHistory> | undefined> = ref();
const giftInfo: Ref<Database['public']['Tables']['GIFTS']['Row'] | undefined> = ref();
onMounted(() => {
  // eslint-disable-next-line dot-notation
  id.value = +useRoute().params['id'];
  gifts.value = useGiftsStore().findGiftHistory(id.value);
  giftInfo.value = useGiftsStore().findGift(id.value);
});

function reloadPage() {
  gifts.value = useGiftsStore().findGiftHistory(id.value);
  giftInfo.value = useGiftsStore().findGift(id.value);
}

const openPersons = ref(new Set());
function openInfo(index: string) {
  if (openPersons.value.has(index)) openPersons.value.delete(index);
  else openPersons.value.add(index);
}
function isOpen(index: string) {
  return openPersons.value.has(index);
}

const giftEdit = ref(false);
function editGift() {
  gifts.value = useGiftsStore().findGiftHistory(id.value);
  giftInfo.value = useGiftsStore().findGift(id.value);
  giftEdit.value = false;
}
</script>
