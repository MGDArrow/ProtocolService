<template>
  <div class="protocol-service">
    <div class="the-auth">
      <RouterView />
    </div>
    <div style="text-align: center;">
      <RouterLink :to="{ name: 'Login' }">
        Войти
      </RouterLink> |
      <RouterLink :to="{ name: 'Register' }">
        Зарегистрироваться
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .the-auth {
    margin-bottom: 3dvh;
  }
</style>
