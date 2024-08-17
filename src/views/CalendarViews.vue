<template>
  <main>
    <div class="calendar__nav">
      <div class="bg-bg flex-center" @click="changeWeekInc(-1)">
        <VIcon :name="'angle-left'" />
      </div>
      <div class="bg-grey flex-center" @click="changeWeekInc(0)">
        {{ weekText }}
      </div>
      <div class="bg-bg flex-center" @click="changeWeekInc(1)">
        <VIcon :name="'angle-right'" />
      </div>
    </div>
    <div class="calendar__filter">
      <label>
        <input v-model="filter.birth" type="checkbox">
        Дни рождения
      </label>
      <label>
        <input v-model="filter.death" type="checkbox">
        Дни смерти
      </label>
      <label>
        <input v-model="filter.angel" type="checkbox">
        Дни ангела
      </label>
      <label>
        <input v-model="filter.tonsure" type="checkbox">
        Дни пострига
      </label>
      <label>
        <input v-model="filter.deacon" type="checkbox">
        Дкн. хиротонии
      </label>
      <label>
        <input v-model="filter.priest" type="checkbox">
        Свщ. хиротонии
      </label>
      <label>
        <input v-model="filter.bishop" type="checkbox">
        Арх. хиротонии
      </label>
    </div>
    <div class="calendar__body">
      <div v-for="(day, index) in weekDates" :key="index">
        <div class="bg-blue calendar__day">
          {{ formatDate(day) }}
        </div>
        <BishopItem
          v-for="bishop in useBishopsStore().getBishopsForCalendar(day, filter)" :key="bishop.id"
          :bishop="bishop" :isOpen="isOpen(`b${bishop.id}`)"
          :date="dayjs(day)"
          class="border-blue"
          @click="openInfo(`b${bishop.id}`)"
        />
        <PriestItem
          v-for="priest in usePriestsStore().getPriestsForCalendar(day, filter)" :key="priest.id"
          :priest="priest" :isOpen="isOpen(`p${priest.id}`)"
          :date="dayjs(day)"
          class="border-orange"
          @click="openInfo(`p${priest.id}`)"
        />
        <SecularItem
          v-for="secular in useSecularsStore().getSecularsForCalendar(day, filter)" :key="secular.id"
          :secular="secular" :isOpen="isOpen(`s${secular.id}`)"
          :date="dayjs(day)"
          class="border-purple"
          @click="openInfo(`s${secular.id}`)"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import BishopItem from '@components/BishopItem.vue';
import PriestItem from '@components/PriestItem.vue';
import SecularItem from '@components/SecularItem.vue';
import { computed, ref } from 'vue';
import { getDayJS, getWeekText, getWeekDates, changeWeek, formatDate } from '../libs/day.ts';
import { useBishopsStore } from '../stores/bishops.ts';
import { usePriestsStore } from '../stores/priests.ts';
import { useSecularsStore } from '../stores/seculars.ts';
import dayjs from 'dayjs';

const week = ref(getDayJS(Date.now()));

const weekText = computed(() => getWeekText(week.value));
const weekDates = computed(() => getWeekDates(week.value));

function changeWeekInc(inc: 1 | -1 | 0) {
  week.value = changeWeek(week.value, inc);
}

const filter = ref({
  birth  : true,
  death  : true,
  angel  : false,
  tonsure: false,
  deacon : true,
  priest : true,
  bishop : true,
});

const openPersons = ref(new Set());
function openInfo(index: string) {
  if (openPersons.value.has(index)) openPersons.value.delete(index);
  else openPersons.value.add(index);
}
function isOpen(index: string) {
  return openPersons.value.has(index);
}
</script>

<style lang="scss" scoped>
  .calendar {
    &__nav {
      display: flex;
      gap: 0.5dvh;
      height: 5dvh;
      & div {
        flex: 1;
        &:nth-child(2) {
          flex: 8;
          font-size: 1.5em;
        }
      }
    }
    &__filter{
      display: flex;
      flex-wrap: wrap;
      gap: 0.5dvh;
      margin: 1dvh 0;
      & > label {
        width: calc(50% - 0.25dvh);
        font-size: 1.1rem;
        & > input {
          align-self: flex-end;
          width: 2dvh;
          height: 2dvh;
        }
      }
    }
    &__day {
        margin: 1dvh 0;
        padding: 1dvh;
        font-size: 1.5rem;
        text-align: center;
        text-transform: uppercase;
      }
  }
</style>
