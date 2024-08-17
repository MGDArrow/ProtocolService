<template>
  <form class="auth-login">
    <h1 class="color-blue">
      Авторизация
    </h1>
    <input
      v-model.trim="email"
      type="email" placeholder="E-mail"
      class="bg-bg border-blue"
    >
    <input
      v-model.trim="password"
      type="password" placeholder="Пароль"
      class="bg-bg border-blue"
    >
    <VButton class="bg-blue" @click="submitForm()">
      Войти
    </VButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const email = ref('');
const password = ref('');

async function submitForm() {
  await useUserStore().userLogin(email.value, password.value);
}
</script>

<style scoped lang="scss">
.auth-login{
  width: 100%;
  & > input{
    margin-bottom: 1dvh;
  }
}
</style>
