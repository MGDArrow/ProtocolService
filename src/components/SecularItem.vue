<template>
  <div class="bg-bg persona__item">
    <div class="color-purple flex-center persona__title">
      {{ getTitle(secular) }}
    </div>
    <div v-if="isOpen" class="persona__info">
      <div v-if="secular?.title">
        <span class="color-purple">Должность:</span>
        <span>{{ secular.title }}</span>
      </div>
      <div>
        <span class="color-purple">Календарь:</span>
        <span>{{ secular.hidden ? 'Скрывать' : 'Отображать' }}</span>
      </div>
      <div v-if="secular?.date_birth">
        <span class="color-purple">Дата рождения:</span>
        <span :class="{ 'color-green': getIsThisDate(secular.date_birth, date) }">
          {{ getTextDate(secular.date_birth) }}
          {{ getDateLong(secular.date_birth, date) }}
        </span>
      </div>
    </div>
    <RouterLink :to="{ name: 'Secular', params: { id: secular.id } }">
      <VButton v-if="isOpen" class="bg-purple">
        Подробнее
      </VButton>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { getDateLong, getTextDate, getIsThisDate } from '../libs/day.ts';
import { Database } from '../types/supabase.ts';

interface Props {
  secular: Database['public']['Tables']['SECULARS']['Row'];
  isOpen : boolean;
  date?  : dayjs.Dayjs | number ;
}

withDefaults(defineProps<Props>(), {
  date: Date.now(),
});


function getTitle(secular: Database['public']['Tables']['SECULARS']['Row']) {
  let title = '';
  title += secular.name_second ? secular.name_second : '';
  title += secular.name_first  ? ` ${secular.name_first}` :  '';
  title += secular.name_father ? ` ${secular.name_father}` : '';
  return title;
}
</script>
