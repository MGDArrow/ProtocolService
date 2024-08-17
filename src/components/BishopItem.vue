<template>
  <div class="bg-bg persona__item">
    <div class="color-blue flex-center persona__title">
      {{ getTitle(bishop) }}
    </div>
    <div v-if="isOpen" class="persona__body">
      <div v-if="bishop?.photo" class="persona__photo">
        <img :src="bishop.photo" alt="Photo">
      </div>
      <div class="persona__info">
        <div v-if="bishop?.name_second">
          <span class="color-blue">Фамилия:</span>
          <span>{{ bishop.name_second }}</span>
        </div>
        <div v-if="bishop?.name_first">
          <span class="color-blue">Имя:</span>
          <span>{{ bishop.name_first }}</span>
        </div>
        <div v-if="bishop?.name_father">
          <span class="color-blue">Отчество:</span>
          <span>{{ bishop.name_father }}</span>
        </div>
        <div>
          <span class="color-blue">Календарь:</span>
          <span>{{ bishop.hidden ? 'Скрывать' : 'Отображать' }}</span>
        </div>
        <div v-if="bishop?.date_birth">
          <span class="color-blue">Дата рождения:</span>
          <span :class="{ 'color-green': getIsThisDate(bishop.date_birth, date) }">
            {{ getTextDate(bishop.date_birth) }}
            {{ getDateLong(bishop.date_birth, date) }}
          </span>
        </div>
        <div v-if="bishop?.date_death">
          <span class="color-blue">Дата смерти:</span>
          <span :class="{ 'color-green': getIsThisDate(bishop.date_death, date) }">
            {{ getTextDate(bishop.date_death) }}
            {{ getDateLong(bishop.date_death, date) }}
          </span>
        </div>
        <div v-if="bishop?.date_tonsure">
          <span class="color-blue">Дата пострига:</span>
          <span :class="{ 'color-green': getIsThisDate(bishop.date_tonsure, date) }">
            {{ getTextDate(bishop.date_tonsure) }}
            {{ getDateLong(bishop.date_tonsure, date) }}
          </span>
        </div>
        <div v-if="bishop?.date_angel">
          <span class="color-blue">День ангела:</span>
          <span :class="{ 'color-green': getIsThisDate(bishop.date_angel, date) }">
            {{ getTextDate(bishop.date_angel) }}
            {{ getDateLong(bishop.date_angel, date) }}
          </span>
        </div>
        <div v-if="bishop?.date_ordination">
          <span class="color-blue">Хиротония:</span>
          <span :class="{ 'color-green': getIsThisDate(bishop.date_ordination, date) }">
            {{ getTextDate(bishop.date_ordination) }}
            {{ getDateLong(bishop.date_ordination, date) }}
          </span>
        </div>
      </div>
    </div>
    <RouterLink :to="{ name: 'Bishop', params: { id: bishop.id } }">
      <VButton v-if="isOpen" class="bg-blue">
        Подробнее
      </VButton>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { getDateLong, getIsThisDate, getTextDate } from '../libs/day.ts';
import { Database } from '../types/supabase.ts';

interface Props {
  bishop: Database['public']['Tables']['BISHOPS']['Row'];
  isOpen: boolean;
  date? : dayjs.Dayjs | number ;
}


withDefaults(defineProps<Props>(), {
  date: Date.now(),
});

function getTitle(bishop: Database['public']['Tables']['BISHOPS']['Row']) {
  let title = '';
  title += bishop.name_monk ? bishop.name_monk : '';
  title += bishop.title ? ` ${bishop.title}` : '';

  return title;
}
</script>
