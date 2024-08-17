<template>
  <form class="auth-reg">
    <h1 class="color-blue">
      Регистрация
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
    <input
      v-model.trim="passwordConfirm"
      type="password" placeholder="Повторный пароль"
      class="bg-bg border-blue"
    >
    <VButton class="bg-blue" @click="submitForm()">
      Зарегистрироваться
    </VButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

async function submitForm() {
  if (password.value === passwordConfirm.value) await useUserStore().userReg(email.value, password.value);
}
</script>

<style scoped lang="scss">
.auth-reg{
    width: 100%;
  & > input{
    margin-bottom: 1dvh;
  }
}
</style>
