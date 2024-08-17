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
      Изменить
    </VButton>
  </form>
</template>

<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue';
import { Database } from '../../types/supabase.ts';
import { usePriestsStore } from '../../stores/priests.ts';
import { getDateForDB, getDateForInput } from '../../libs/day.ts';
interface Props {
  priest: Database['public']['Tables']['PRIESTS']['Row'] ;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  edit: [];
}>();

const priestNameFirst = ref(props.priest.name_first);
const priestNameSecond = ref(props.priest.name_second);
const priestNameFather = ref(props.priest.name_father);
const priestNameMonk = ref(props.priest.name_monk);
const priestTitle = ref(props.priest.title);

const priestBirth = ref(getDateForInput(props.priest.date_birth));
const priestDeath = ref(getDateForInput(props.priest.date_death));
const priestDeacon = ref(getDateForInput(props.priest.date_deacon));
const priestPriest = ref(getDateForInput(props.priest.date_priest));


async function submitForm() {
  const endObj: Database['public']['Tables']['PRIESTS']['Row'] = {
    name_monk  : priestNameMonk.value,
    name_first : priestNameFirst.value,
    name_father: priestNameFather.value,
    name_second: priestNameSecond.value,
    title      : priestTitle.value,
    date_birth : getDateForDB(priestBirth.value),
    date_death : getDateForDB(priestDeath.value),
    date_deacon: getDateForDB(priestDeacon.value),
    date_priest: getDateForDB(priestPriest.value),
    hidden     : props.priest.hidden,
    id         : props.priest.id,
  };
  await usePriestsStore().changePriestObj(props.priest.id, endObj);
  emit('edit');
}
</script>
