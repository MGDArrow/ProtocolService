<template>
  <div v-if="!secularEdit && !isGetGift" class="persona">
    <h1 class="color-purple">
      {{ getTitle(secular) }}
    </h1>
    <div v-if="secular" class="persona__info">
      <div v-if="secular?.title">
        <span class="color-purple">Должность:</span>
        <span>{{ secular.title }}</span>
      </div>
      <div v-if="secular?.name_first">
        <span class="color-purple">Имя:</span>
        <span>{{ secular.name_first }}</span>
      </div>
      <div v-if="secular?.name_father">
        <span class="color-purple">Отчество:</span>
        <span>{{ secular.name_father }}</span>
      </div>
      <div v-if="secular?.name_second">
        <span class="color-purple">Фамилия:</span>
        <span>{{ secular.name_second }}</span>
      </div>
      <div>
        <span class="color-purple">Календарь:</span>
        <span>{{ secular?.hidden ? 'Скрывать' : 'Отображать' }}</span>
      </div>
      <div v-if="secular?.date_birth">
        <span class="color-purple">Дата рождения:</span>
        <span :class="{ 'color-green': getIsThisDate(secular.date_birth) }">
          {{ getTextDate(secular.date_birth) }}
          {{ getDateLong(secular.date_birth) }}
        </span>
      </div>
    </div>
    <div v-if="secular" class="persona__buttons">
      <VButton v-if="!secular?.hidden" key="v-button-1" class="bg-red" @click="changeHidden()">
        Скрыть из календаря
      </VButton>
      <VButton v-else key="v-button-2" class="bg-green" @click="changeHidden()">
        Показывать в календаре
      </VButton>
      <VButton class="bg-orange" @click="secularEdit = !secularEdit">
        Изменить данные
      </VButton>
    </div>
    <div v-if="secular" class="persona__gifts">
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
    <VButton v-if="secular" class="bg-turq" @click="isGetGift = true">
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
  <SecularEdit
    v-else-if="secularEdit && !isGetGift"
    :secular="secular"
    @edit="() => editSecular()"
  />
  <GiftGet v-else @getGift="(e) => getGift(e)" />
</template>

<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getTextDate, getIsThisDate, getDateLong, getDateGift } from '../libs/day.ts';
import { Database } from '../types/supabase.ts';
import { useSecularsStore } from '../stores/seculars.ts';
import { onMounted, Ref, ref } from 'vue';
import SecularEdit from '@/components/Forms/SecularEdit.vue';
import GiftGet from '../components/Forms/GiftGet.vue';
import { IHistory } from '../types/types.ts';

const id = ref(0);
const secular: Ref<Database['public']['Tables']['SECULARS']['Row'] | undefined> = ref();
const gifts: Ref<Array<IHistory> | undefined> = ref();
onMounted(() => {
  // eslint-disable-next-line dot-notation
  id.value = +useRoute().params['id'];
  secular.value = useSecularsStore().findSecular(id.value);
  gifts.value = useSecularsStore().getGifts(id.value);
});

function reloadPage() {
  secular.value = useSecularsStore().findSecular(id.value);
  gifts.value = useSecularsStore().getGifts(id.value);
}

const secularEdit = ref(false);

function getTitle(secularObj: Database['public']['Tables']['SECULARS']['Row'] | undefined) {
  if (!secularObj) return '';
  let title = '';
  title += secularObj.name_second ? secularObj.name_second : '';
  title += secularObj.name_first  ? ` ${secularObj.name_first}` : '';
  title += secularObj.name_father ? ` ${secularObj.name_father}` : '';

  return title;
}
async function changeHidden() {
  if (secular.value?.id) try {
    await useSecularsStore().changeSecularHidden(secular.value.id, !secular.value.hidden);
    secular.value = useSecularsStore().findSecular(id.value);
  } catch (error) {
    console.log(error);
  }
}
function editSecular() {
  secular.value = useSecularsStore().findSecular(id.value);
  secularEdit.value = false;
}

const isGetGift = ref(false);
async function getGift(giftInfo: { giftId: number; giftCount: number }) {
  await useSecularsStore().takeGift(giftInfo.giftId, giftInfo.giftCount, id.value);
  gifts.value = useSecularsStore().getGifts(id.value);
  isGetGift.value = false;
}
</script>
