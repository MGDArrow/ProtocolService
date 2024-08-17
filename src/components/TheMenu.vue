<template>
  <nav class="bg-black menu">
    <div class="bg-grey flex-center menu__btn" @click="openMenu = !openMenu">
      Меню
    </div>
    <ul v-if="openMenu" class="menu__list" @click="openMenu = !openMenu">
      <RouterLink :to="{ name: 'Calendar' }" class="bg-bg flex-center">
        <li class="flex-center">Календарь</li>
      </RouterLink>
      <RouterLink :to="{ name: 'Bishops' }" class="bg-bg flex-center">
        <li class="flex-center">Архиереи</li>
      </RouterLink>
      <RouterLink :to="{ name: 'Priests' }" class="bg-bg flex-center">
        <li class="flex-center">Священники</li>
      </RouterLink>
      <RouterLink :to="{ name: 'Seculars' }" class="bg-bg flex-center">
        <li class="flex-center">Светские</li>
      </RouterLink>
      <RouterLink :to="{ name: 'Gifts' }" class="bg-bg flex-center">
        <li class="flex-center">Подарки</li>
      </RouterLink>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const openMenu = ref(false);
</script>

<style lang="scss" scoped>
  .menu {
    position: fixed;
    z-index: 1;
    width: calc(100vw - 2dvh);
    height: max-content;
    text-transform: uppercase;
    &__btn {
      width: 100%;
      height: 5dvh;
      font-size: 1.5em;
    }
    &__list {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 93dvh;
      font-weight: 400;
      font-size: 1.3em;
      & li,
      & a {
        flex: 1;
        margin-top: 0.7dvh;
      }
    }
  }
</style>
