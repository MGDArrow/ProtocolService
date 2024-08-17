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
      Изменить
    </VButton>
  </form>
</template>

<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue';
import { Database } from '../../types/supabase.ts';
import { useSecularsStore } from '../../stores/seculars.ts';
import { getDateForDB, getDateForInput } from '../../libs/day.ts';
interface Props {
  secular: Database['public']['Tables']['SECULARS']['Row'] ;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  edit: [];
}>();

const secularNameFirst = ref(props.secular.name_first);
const secularNameSecond = ref(props.secular.name_second);
const secularNameFather = ref(props.secular.name_father);
const secularTitle = ref(props.secular.title);

const secularBirth = ref(getDateForInput(props.secular.date_birth));


async function submitForm() {
  const endObj: Database['public']['Tables']['SECULARS']['Row'] = {
    name_first : secularNameFirst.value,
    name_father: secularNameFather.value,
    name_second: secularNameSecond.value,
    title      : secularTitle.value,
    date_birth : getDateForDB(secularBirth.value),
    hidden     : props.secular.hidden,
    id         : props.secular.id,
  };
  await useSecularsStore().changeSecularObj(props.secular.id, endObj);
  emit('edit');
}
</script>
