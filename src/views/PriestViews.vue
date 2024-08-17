<template>
  <div v-if="!priestEdit && !isGetGift" class="persona">
    <h1 class="color-orange">
      {{ getTitle(priest) }}
    </h1>
    <div v-if="priest" class="persona__info">
      <div v-if="priest?.title">
        <span class="color-orange">Сан:</span>
        <span>{{ priest.title }}</span>
      </div>
      <div v-if="priest?.name_monk">
        <span class="color-orange">Монашеское имя:</span>
        <span>{{ priest.name_monk }}</span>
      </div>
      <div v-if="priest?.name_first">
        <span class="color-orange">Имя:</span>
        <span v-if="priest.name_monk">({{ priest.name_first }})</span>
        <span v-else>{{ priest.name_first }}</span>
      </div>
      <div v-if="priest?.name_father">
        <span class="color-orange">Отчество:</span>
        <span>{{ priest.name_father }}</span>
      </div>
      <div v-if="priest?.name_second">
        <span class="color-orange">Фамилия:</span>
        <span>{{ priest.name_second }}</span>
      </div>
      <div>
        <span class="color-orange">Календарь:</span>
        <span>{{ priest?.hidden ? 'Скрывать' : 'Отображать' }}</span>
      </div>
      <div v-if="priest?.date_birth">
        <span class="color-orange">Дата рождения:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_birth) }">
          {{ getTextDate(priest.date_birth) }}
          {{ getDateLong(priest.date_birth) }}
        </span>
      </div>
      <div v-if="priest?.date_death">
        <span class="color-orange">Дата смерти:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_death) }">
          {{ getTextDate(priest.date_death) }}
          {{ getDateLong(priest.date_death) }}
        </span>
      </div>
      <div v-if="priest?.date_deacon">
        <span class="color-orange">Хиротония Дкн.:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_deacon) }">
          {{ getTextDate(priest.date_deacon) }}
          {{ getDateLong(priest.date_deacon) }}
        </span>
      </div>
      <div v-if="priest?.date_priest">
        <span class="color-orange">Хиротония Свщ.:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_priest) }">
          {{ getTextDate(priest.date_priest) }}
          {{ getDateLong(priest.date_priest) }}
        </span>
      </div>
    </div>
    <div v-if="priest" class="persona__buttons">
      <VButton v-if="!priest?.hidden" key="v-button-1" class="bg-red" @click="changeHidden()">
        Скрыть из календаря
      </VButton>
      <VButton v-else key="v-button-2" class="bg-green" @click="changeHidden()">
        Показывать в календаре
      </VButton>
      <VButton class="bg-orange" @click="priestEdit = !priestEdit">
        Изменить данные
      </VButton>
    </div>
    <div v-if="priest" class="persona__gifts">
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
    <VButton v-if="priest" class="bg-turq" @click="isGetGift = true">
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
  <PriestEdit
    v-else-if="priestEdit && !isGetGift"
    :priest="priest"
    @edit="() => editPriest()"
  />
  <GiftGet v-else @getGift="(e) => getGift(e)" />
</template>

<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getTextDate, getIsThisDate, getDateLong, getDateGift } from '../libs/day.ts';
import { Database } from '../types/supabase.ts';
import { usePriestsStore } from '../stores/priests.ts';
import { onMounted, Ref, ref } from 'vue';
import PriestEdit from '@/components/Forms/PriestEdit.vue';
import GiftGet from '../components/Forms/GiftGet.vue';
import { IHistory } from '../types/types.ts';

const id = ref(0);
const priest: Ref<Database['public']['Tables']['PRIESTS']['Row'] | undefined> = ref();
const gifts: Ref<Array<IHistory> | undefined> = ref();
onMounted(() => {
  // eslint-disable-next-line dot-notation
  id.value = +useRoute().params['id'];
  priest.value = usePriestsStore().findPriest(id.value);
  gifts.value = usePriestsStore().getGifts(id.value);
});

function reloadPage() {
  priest.value = usePriestsStore().findPriest(id.value);
  gifts.value = usePriestsStore().getGifts(id.value);
}

const priestEdit = ref(false);

function getTitle(priestObj: Database['public']['Tables']['PRIESTS']['Row'] | undefined) {
  if (!priestObj) return '';
  let title = '';
  title += priestObj.title ? priestObj.title : '';
  title += priestObj.name_monk ? ` ${priestObj.name_monk}` : '';
  title += priestObj.name_first && priestObj.name_monk ? ` (${priestObj.name_first})` : priestObj.name_first ? ` ${priestObj.name_first}` : '';
  title += priestObj.name_father ? ` ${priestObj.name_father}` : '';
  title += priestObj.name_second ? ` ${priestObj.name_second}` : '';

  return title;
}

async function changeHidden() {
  if (priest.value?.id) try {
    await usePriestsStore().changePriestHidden(priest.value.id, !priest.value.hidden);
    priest.value = usePriestsStore().findPriest(id.value);
  } catch (error) {
    console.log(error);
  }
}
function editPriest() {
  priest.value = usePriestsStore().findPriest(id.value);
  priestEdit.value = false;
}

const isGetGift = ref(false);
async function getGift(giftInfo: { giftId: number; giftCount: number }) {
  await usePriestsStore().takeGift(giftInfo.giftId, giftInfo.giftCount, id.value);
  gifts.value = usePriestsStore().getGifts(id.value);
  isGetGift.value = false;
}
</script>
