<template>
  <form class="persona__edit">
    <span>Монашеское имя:</span>
    <input v-model.trim="bishopNameMonk" type="text" placeholder="Монашеское имя" class="bg-bg border-blue">
    <span>Фамилия:</span>
    <input v-model.trim="bishopNameSecond" type="text" placeholder="Фамилия" class="bg-bg border-blue">
    <span>Титул:</span>
    <input v-model.trim="bishopTitle" type="text" placeholder="Титул" class="bg-bg border-blue">
    <span>Имя:</span>
    <input v-model.trim="bishopNameFirst" type="text" placeholder="Имя" class="bg-bg border-blue">
    <span>Отчество:</span>
    <input v-model.trim="bishopNameFather" type="text" placeholder="Отчество" class="bg-bg border-blue">
    <span>E-mail:</span>
    <input v-model.trim="bishopEmail" type="text" placeholder="E-mail" class="bg-bg border-blue">
    <span>Сайт:</span>
    <input v-model.trim="bishopWebsite" type="text" placeholder="Сайт" class="bg-bg border-blue">
    <span>Дата рождения:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="bishopBirth.day" type="text" placeholder="День" class="bg-bg border-blue">
      <input v-model.trim="bishopBirth.month" type="text" placeholder="Месяц" class="bg-bg border-blue">
      <input v-model.trim="bishopBirth.year" type="text" placeholder="Год" class="bg-bg border-blue">
    </div>
    <span>Дата смерти:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="bishopDeath.day" type="text" placeholder="День" class="bg-bg border-blue">
      <input v-model.trim="bishopDeath.month" type="text" placeholder="Месяц" class="bg-bg border-blue">
      <input v-model.trim="bishopDeath.year" type="text" placeholder="Год" class="bg-bg border-blue">
    </div>
    <span>День ангела:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="bishopAngel.day" type="text" placeholder="День" class="bg-bg border-blue">
      <input v-model.trim="bishopAngel.month" type="text" placeholder="Месяц" class="bg-bg border-blue">
      <input v-model.trim="bishopAngel.year" type="text" placeholder="Год" class="bg-bg border-blue">
    </div>
    <span>Дата хиротонии:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="bishopOrdination.day" type="text" placeholder="День" class="bg-bg border-blue">
      <input v-model.trim="bishopOrdination.month" type="text" placeholder="Месяц" class="bg-bg border-blue">
      <input v-model.trim="bishopOrdination.year" type="text" placeholder="Год" class="bg-bg border-blue">
    </div>
    <span>Дата пострига:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="bishopTonsure.day" type="text" placeholder="День" class="bg-bg border-blue">
      <input v-model.trim="bishopTonsure.month" type="text" placeholder="Месяц" class="bg-bg border-blue">
      <input v-model.trim="bishopTonsure.year" type="text" placeholder="Год" class="bg-bg border-blue">
    </div>
    <VButton class="bg-blue" @click="submitForm()">
      Добавить
    </VButton>
  </form>
</template>

<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue';
import { useBishopsStore } from '../../stores/bishops.ts';
import { getDateForDB, getDateForInput } from '../../libs/day.ts';
import { IBishop } from '../../types/types.ts';

const emit = defineEmits<{
  add: [];
}>();

const bishopNameFirst = ref('');
const bishopNameSecond = ref('');
const bishopNameFather = ref('');
const bishopNameMonk = ref('');
const bishopTitle = ref('');
const bishopEmail = ref('');
const bishopWebsite = ref('');

const bishopBirth = ref(getDateForInput(null));
const bishopDeath = ref(getDateForInput(null));
const bishopAngel = ref(getDateForInput(null));
const bishopOrdination = ref(getDateForInput(null));
const bishopTonsure = ref(getDateForInput(null));


async function submitForm() {
  const endObj: IBishop = {
    name_monk      : checkNull(bishopNameMonk.value),
    name_first     : checkNull(bishopNameFirst.value),
    name_father    : checkNull(bishopNameFather.value),
    name_second    : checkNull(bishopNameSecond.value),
    title          : checkNull(bishopTitle.value),
    email          : checkNull(bishopEmail.value),
    website        : checkNull(bishopWebsite.value),
    date_birth     : getDateForDB(bishopBirth.value),
    date_angel     : getDateForDB(bishopAngel.value),
    date_death     : getDateForDB(bishopDeath.value),
    date_ordination: getDateForDB(bishopOrdination.value),
    date_tonsure   : getDateForDB(bishopTonsure.value),
    photo          : null,
    hidden         : false,
  };
  await useBishopsStore().addBishop(endObj);
  emit('add');
}
function checkNull(chekString: string) {
  if (chekString === '') return null;
  else return chekString;
}
</script>

