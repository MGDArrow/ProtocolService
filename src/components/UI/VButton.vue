<template>
  <div class="button">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineSlots<{ default: string }>();
</script>

<style scoped lang="scss">
.button{
  width: 100%;
  padding: 1dvh;
  font-size: 1.2rem;
  letter-spacing: 0.3vw;
  text-align: center;
  text-transform: uppercase;
}
</style>
