<template>
  <form class="persona__edit">
    <span>Должность:</span>
    <input v-model.trim="secularTitle" type="text" placeholder="Должность" class="bg-bg border-purple">
    <span>Имя:</span>
    <input v-model.trim="secularNameFirst" type="text" placeholder="Имя" class="bg-bg border-purple">
    <span>Отчество:</span>
    <input v-model.trim="secularNameFather" type="text" placeholder="Отчество" class="bg-bg border-purple">
    <span>Фамилия:</span>
    <input v-model.trim="secularNameSecond" type="text" placeholder="Фамилия" class="bg-bg border-purple">
    <span>Дата рождения:</span>
    <div class="inputgroupe__date">
      <input v-model.trim="secularBirth.day" type="text" placeholder="День" class="bg-bg border-purple">
      <input v-model.trim="secularBirth.month" type="text" placeholder="Месяц" class="bg-bg border-purple">
      <input v-model.trim="secularBirth.year" type="text" placeholder="Год" class="bg-bg border-purple">
    </div>
    <VButton class="bg-purple" @click="submitForm()">
      Добавить
    </VButton>
  </form>
</template>

<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue';
import { useSecularsStore } from '../../stores/seculars.ts';
import { getDateForDB, getDateForInput } from '../../libs/day.ts';
import { ISecular } from '../../types/types.ts';


const emit = defineEmits<{
  add: [];
}>();

const secularNameFirst = ref('');
const secularNameSecond = ref('');
const secularNameFather = ref('');
const secularTitle = ref('');

const secularBirth = ref(getDateForInput(null));


async function submitForm() {
  const endObj: ISecular = {
    name_first : checkNull(secularNameFirst.value),
    name_father: checkNull(secularNameFather.value),
    name_second: checkNull(secularNameSecond.value),
    title      : checkNull(secularTitle.value),
    date_birth : getDateForDB(secularBirth.value),
    hidden     : false,
  };
  await useSecularsStore().addSecular(endObj);
  emit('add');
}

function checkNull(chekString: string) {
  if (chekString === '') return null;
  else return chekString;
}
</script>
