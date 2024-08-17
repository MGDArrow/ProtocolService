import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { supabase } from '../libs/supabase';
import { User } from '@supabase/supabase-js';
import { router } from '../router/router';

export const useUserStore = defineStore('user', () => {
  const client: Ref<User | null> = ref(null);

  async function userGet() {
    const { data: { user }, error } = await supabase.auth.getUser();
    client.value = user;
    if (error) return false;
    else return true;
  }
  async function userLogin(email: string, password: string) {
    await supabase.auth.signInWithPassword({ email, password });
    await userGet();
    await router.push({ name: 'Calendar' });
  }
  async function userReg(email: string, password: string) {
    await supabase.auth.signUp({ email, password });
    await userGet();
    await router.push({ name: 'Calendar' });
  }

  return { client,
    userGet,
    userLogin,
    userReg };
});
