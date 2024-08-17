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
      Изменить
    </VButton>
  </form>
</template>

<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue';
import { Database } from '../../types/supabase.ts';
import { useBishopsStore } from '../../stores/bishops.ts';
import { getDateForDB, getDateForInput } from '../../libs/day.ts';
interface Props {
  bishop: Database['public']['Tables']['BISHOPS']['Row'] ;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  edit: [];
}>();

const bishopNameFirst = ref(props.bishop.name_first);
const bishopNameSecond = ref(props.bishop.name_second);
const bishopNameFather = ref(props.bishop.name_father);
const bishopNameMonk = ref(props.bishop.name_monk);
const bishopTitle = ref(props.bishop.title);
const bishopEmail = ref(props.bishop.email);
const bishopWebsite = ref(props.bishop.website);

const bishopBirth = ref(getDateForInput(props.bishop.date_birth));
const bishopDeath = ref(getDateForInput(props.bishop.date_death));
const bishopAngel = ref(getDateForInput(props.bishop.date_angel));
const bishopOrdination = ref(getDateForInput(props.bishop.date_ordination));
const bishopTonsure = ref(getDateForInput(props.bishop.date_tonsure));


async function submitForm() {
  const endObj: Database['public']['Tables']['BISHOPS']['Row'] = {
    name_monk      : bishopNameMonk.value,
    name_first     : bishopNameFirst.value,
    name_father    : bishopNameFather.value,
    name_second    : bishopNameSecond.value,
    title          : bishopTitle.value,
    email          : bishopEmail.value,
    website        : bishopWebsite.value,
    date_birth     : getDateForDB(bishopBirth.value),
    date_angel     : getDateForDB(bishopAngel.value),
    date_death     : getDateForDB(bishopDeath.value),
    date_ordination: getDateForDB(bishopOrdination.value),
    date_tonsure   : getDateForDB(bishopTonsure.value),
    photo          : props.bishop.photo,
    hidden         : props.bishop.hidden,
    id             : props.bishop.id,
  };
  await useBishopsStore().changeBishopObj(props.bishop.id, endObj);
  emit('edit');
}
</script>

