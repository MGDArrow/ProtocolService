<template>
  <div v-if="!bishopEdit && !isGetGift" class="persona">
    <h1 class="color-blue">
      {{ getTitle(bishop) }}
    </h1>
    <div v-if="bishop?.photo" class="persona__photo">
      <img :src="bishop.photo" alt="Photo">
    </div>
    <div v-if="bishop" class="persona__info">
      <div v-if="bishop?.name_second">
        <span class="color-blue">Фамилия:</span>
        <span>{{ bishop.name_second }}</span>
      </div>
      <div v-if="bishop?.name_first">
        <span class="color-blue">Имя:</span>
        <span>{{ bishop.name_first }}</span>
      </div>
      <div v-if="bishop?.name_father">
        <span class="color-blue">Отчество:</span>
        <span>{{ bishop.name_father }}</span>
      </div>
      <div>
        <span class="color-blue">Календарь:</span>
        <span>{{ bishop?.hidden ? 'Скрывать' : 'Отображать' }}</span>
      </div>
      <div v-if="bishop?.email">
        <span class="color-blue">E-mail:</span>
        <span>{{ bishop.email }}</span>
      </div>
      <div v-if="bishop?.website">
        <span class="color-blue">Сайт:</span>
        <span>{{ bishop.website }}</span>
      </div>
      <div v-if="bishop?.date_birth">
        <span class="color-blue">Дата рождения:</span>
        <span :class="{ 'color-green': getIsThisDate(bishop.date_birth) }">
          {{ getTextDate(bishop.date_birth) }}
          {{ getDateLong(bishop.date_birth) }}
        </span>
      </div>
      <div v-if="bishop?.date_death">
        <span class="color-blue">Дата смерти:</span>
        <span :class="{ 'color-green': getIsThisDate(bishop.date_death) }">
          {{ getTextDate(bishop.date_death) }}
          {{ getDateLong(bishop.date_death) }}
        </span>
      </div>
      <div v-if="bishop?.date_tonsure">
        <span class="color-blue">Дата пострига:</span>
        <span :class="{ 'color-green': getIsThisDate(bishop.date_tonsure) }">
          {{ getTextDate(bishop.date_tonsure) }}
          {{ getDateLong(bishop.date_tonsure) }}
        </span>
      </div>
      <div v-if="bishop?.date_angel">
        <span class="color-blue">День ангела:</span>
        <span :class="{ 'color-green': getIsThisDate(bishop.date_angel) }">
          {{ getTextDate(bishop.date_angel) }}
          {{ getDateLong(bishop.date_angel) }}
        </span>
      </div>
      <div v-if="bishop?.date_ordination">
        <span class="color-blue">Хиротония:</span>
        <span :class="{ 'color-green': getIsThisDate(bishop.date_ordination) }">
          {{ getTextDate(bishop.date_ordination) }}
          {{ getDateLong(bishop.date_ordination) }}
        </span>
      </div>
    </div>
    <div v-if="bishop" class="persona__buttons">
      <VButton v-if="!bishop?.hidden" key="v-button-1" class="bg-red" @click="changeHidden()">
        Скрыть из календаря
      </VButton>
      <VButton v-else key="v-button-2" class="bg-green" @click="changeHidden()">
        Показывать в календаре
      </VButton>
      <VButton class="bg-orange" @click="bishopEdit = !bishopEdit">
        Изменить данные
      </VButton>
    </div>
    <div v-if="bishop" class="persona__gifts">
      <h2 class="color-turq">
        История подарков
      </h2>
      <div class="persona__history">
        <div
          v-for="gift in gifts"
          :key="gift.id" class="border-turq gift__item"
        >
          <div class="gift__title">
            <div class="bg-turq flex-center">
              {{ gift.GIFTS?.name }}
            </div>
            <div class="flex-center">
              {{ gift.count }}
            </div>
            <div class="flex-center">
              {{ getDateGift(gift.create_date) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <VButton v-if="bishop" class="bg-turq" @click="isGetGift = true">
      Подарить подарок
    </VButton>
    <VButton
      v-else
      key="v-button-4"
      class="bg-grey"
      @click="reloadPage()"
    >
      Перезагрузить страницу
    </VButton>
  </div>
  <BishopEdit
    v-else-if="bishopEdit && !isGetGift"
    :bishop="bishop"
    @edit="() => editBishop()"
  />
  <GiftGet v-else @getGift="(e) => getGift(e)" />
</template>

<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getTextDate, getIsThisDate, getDateLong, getDateGift } from '../libs/day.ts';
import { Database } from '../types/supabase.ts';
import { useBishopsStore } from '../stores/bishops.ts';
import { onMounted, Ref, ref } from 'vue';
import BishopEdit from '@/components/Forms/BishopEdit.vue';
import GiftGet from '../components/Forms/GiftGet.vue';
import { IHistory } from '../types/types.ts';

const id = ref(0);
const bishop: Ref<Database['public']['Tables']['BISHOPS']['Row'] | undefined> = ref();
const gifts: Ref<Array<IHistory> | undefined> = ref();
onMounted(() => {
  // eslint-disable-next-line dot-notation
  id.value = +useRoute().params['id'];
  bishop.value = useBishopsStore().findBishop(id.value);
  gifts.value = useBishopsStore().getGifts(id.value);
});

function reloadPage() {
  bishop.value = useBishopsStore().findBishop(id.value);
  gifts.value = useBishopsStore().getGifts(id.value);
}

const bishopEdit = ref(false);

function getTitle(bishopObj: Database['public']['Tables']['BISHOPS']['Row'] | undefined) {
  if (!bishopObj) return '';
  let title = '';
  title += bishopObj.name_monk ? bishopObj.name_monk : '';
  title += bishopObj.title ? ` ${bishopObj.title}` : '';

  return title;
}

async function changeHidden() {
  if (bishop.value?.id) try {
    await useBishopsStore().changeBishopHidden(bishop.value.id, !bishop.value.hidden);
    bishop.value = useBishopsStore().findBishop(id.value);
  } catch (error) {
    console.log(error);
  }
}
function editBishop() {
  bishop.value = useBishopsStore().findBishop(id.value);
  bishopEdit.value = false;
}

const isGetGift = ref(false);
async function getGift(giftInfo: { giftId: number; giftCount: number }) {
  await useBishopsStore().takeGift(giftInfo.giftId, giftInfo.giftCount, id.value);
  gifts.value = useBishopsStore().getGifts(id.value);
  isGetGift.value = false;
}
</script>
