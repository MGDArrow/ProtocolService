<template>
  <form class="persona__edit">
    <span>Сан:</span>
    <input v-model.trim="priestTitle" type="text" placeholder="Сан" class="bg-bg border-orange">
    <span>Монашеское имя:</span>
    <input v-model.trim="priestNameMonk" type="text" placeholder="Монашеское имя" class="bg-bg border-orange">
    <span>Имя:</span>
    <input v-model.trim="priestNameFirst" type="text" placeholder="Имя" class="bg-bg border-orange">
    <span>Отчество:</span>
    <input v-model.trim="priestNameFather" type="text" placeholder="Отчество" class="bg-bg border-orange">
    <span>Фамилия:</span>
    <input v-model.trim="priestNameSecond" type="text" placeholder="Фамилия" class="bg-bg border-orange">
    <span>Дата рождения:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="priestBirth.day" type="text" placeholder="День" class="bg-bg border-orange">
      <input v-model.trim="priestBirth.month" type="text" placeholder="Месяц" class="bg-bg border-orange">
      <input v-model.trim="priestBirth.year" type="text" placeholder="Год" class="bg-bg border-orange">
    </div>
    <span>Дата смерти:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="priestDeath.day" type="text" placeholder="День" class="bg-bg border-orange">
      <input v-model.trim="priestDeath.month" type="text" placeholder="Месяц" class="bg-bg border-orange">
      <input v-model.trim="priestDeath.year" type="text" placeholder="Год" class="bg-bg border-orange">
    </div>
    <span>Дьяконская хиротония:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="priestDeacon.day" type="text" placeholder="День" class="bg-bg border-orange">
      <input v-model.trim="priestDeacon.month" type="text" placeholder="Месяц" class="bg-bg border-orange">
      <input v-model.trim="priestDeacon.year" type="text" placeholder="Год" class="bg-bg border-orange">
    </div>
    <span>Священническая хиротония:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="priestPriest.day" type="text" placeholder="День" class="bg-bg border-orange">
      <input v-model.trim="priestPriest.month" type="text" placeholder="Месяц" class="bg-bg border-orange">
      <input v-model.trim="priestPriest.year" type="text" placeholder="Год" class="bg-bg border-orange">
    </div>
    <VButton class="bg-orange" @click="submitForm()">
      Добавить
    </VButton>
  </form>
</template>

<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue';
import { usePriestsStore } from '../../stores/priests.ts';
import { getDateForDB, getDateForInput } from '../../libs/day.ts';
import { IPriest } from '../../types/types.ts';


const emit = defineEmits<{
  add: [];
}>();

const priestNameFirst = ref('');
const priestNameSecond = ref('');
const priestNameFather = ref('');
const priestNameMonk = ref('');
const priestTitle = ref('');

const priestBirth = ref(getDateForInput(null));
const priestDeath = ref(getDateForInput(null));
const priestDeacon = ref(getDateForInput(null));
const priestPriest = ref(getDateForInput(null));


async function submitForm() {
  const endObj: IPriest = {
    name_monk  : checkNull(priestNameMonk.value),
    name_first : checkNull(priestNameFirst.value),
    name_father: checkNull(priestNameFather.value),
    name_second: checkNull(priestNameSecond.value),
    title      : checkNull(priestTitle.value),
    date_birth : getDateForDB(priestBirth.value),
    date_death : getDateForDB(priestDeath.value),
    date_deacon: getDateForDB(priestDeacon.value),
    date_priest: getDateForDB(priestPriest.value),
    hidden     : false,
  };
  await usePriestsStore().addPriest(endObj);
  emit('add');
}

function checkNull(chekString: string) {
  if (chekString === '') return null;
  else return chekString;
}
</script>
