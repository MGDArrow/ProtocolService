<template>
  <div class="bg-bg persona__item">
    <div class="color-orange flex-center persona__title">
      {{ getTitle(priest) }}
    </div>
    <div v-if="isOpen" class="persona__info">
      <div>
        <span class="color-orange">Календарь:</span>
        <span>{{ priest.hidden ? 'Скрывать' : 'Отображать' }}</span>
      </div>
      <div v-if="priest?.date_birth">
        <span class="color-orange">Дата рождения:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_birth, date) }">
          {{ getTextDate(priest.date_birth) }}
          {{ getDateLong(priest.date_birth, date) }}
        </span>
      </div>
      <div v-if="priest?.date_death">
        <span class="color-orange">Дата смерти:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_death, date) }">
          {{ getTextDate(priest.date_death) }}
          {{ getDateLong(priest.date_death, date) }}
        </span>
      </div>
      <div v-if="priest?.date_deacon">
        <span class="color-orange">Хиротония Дкн.:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_deacon, date) }">
          {{ getTextDate(priest.date_deacon) }}
          {{ getDateLong(priest.date_deacon, date) }}
        </span>
      </div>
      <div v-if="priest?.date_priest">
        <span class="color-orange">Хиротония Свщ.:</span>
        <span :class="{ 'color-green': getIsThisDate(priest.date_priest, date) }">
          {{ getTextDate(priest.date_priest) }}
          {{ getDateLong(priest.date_priest, date) }}
        </span>
      </div>
    </div>
    <RouterLink :to="{ name: 'Priest', params: { id: priest.id } }">
      <VButton v-if="isOpen" class="bg-orange">
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
  priest: Database['public']['Tables']['PRIESTS']['Row'];
  isOpen: boolean;
  date? : dayjs.Dayjs | number ;
}

withDefaults(defineProps<Props>(), {
  date: Date.now(),
});


function getTitle(priest: Database['public']['Tables']['PRIESTS']['Row']) {
  let title = '';
  title += priest.title ? priest.title : '';
  title += priest.name_monk ? ` ${priest.name_monk}` : '';
  title += priest.name_first && priest.name_monk ? ` (${priest.name_first})` : priest.name_first ? ` ${priest.name_first}` : '';
  title += priest.name_father ? ` ${priest.name_father}` : '';
  title += priest.name_second ? ` ${priest.name_second}` : '';
  return title;
}
</script>
