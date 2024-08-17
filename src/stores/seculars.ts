/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { supabase } from '../libs/supabase.ts';
import { Database } from '../types/supabase.ts';
import dayjs from 'dayjs';
import { checkDate } from '../libs/day.ts';
import { IOptions, ISecular } from '../types/types.ts';
import { useGiftsStore } from './gifts.ts';

export const useSecularsStore = defineStore('seculars', () => {
  const seculars : Ref<Array<Database['public']['Tables']['SECULARS']['Row']> | null> = ref([]);
  const hiddenSeculars = computed(() => seculars.value?.filter(secular => !secular.hidden));

  async function getSecularsFromDB() {
    const { data: SECULARS } = await supabase.from('SECULARS').select('*');
    seculars.value = SECULARS;
  }

  function getSecularsForCalendar(dateCalendar: dayjs.Dayjs, option: IOptions) {
    return hiddenSeculars.value?.filter(secular => checkDate(dateCalendar, secular.date_birth, option.birth));
  }

  function findSecular(id:number) {
    return seculars.value?.find(secular => secular.id === id);
  }

  async function changeSecularHidden(id:number, newHidden:boolean) {
    try {
      await supabase
        .from('SECULARS')
        .update({ hidden: newHidden })
        .eq('id', id);
      await getSecularsFromDB();
    } catch {
      throw new Error('Не удалось изменить видимость в календаре');
    }
  }
  async function changeSecularObj(id:number, newObj:Database['public']['Tables']['SECULARS']['Row']) {
    try {
      await supabase
        .from('SECULARS')
        .update(newObj)
        .eq('id', id);

      await getSecularsFromDB();
    } catch {
      throw new Error('Не удалось изменить данные');
    }
  }
  async function addSecular(secular: ISecular) {
    try {
      await supabase
        .from('SECULARS')
        .insert([secular]);
      await getSecularsFromDB();
    } catch {
      throw new Error('Не удалось добавить');
    }
  }
  async function takeGift(giftID:number, count: number, secularID: number) {
    try {
      await useGiftsStore().changeGiftStorage(giftID, count);
      await supabase.from('HISTORY').insert([{ count, gift: giftID, secular_id: secularID }]);
      await useGiftsStore().getHistoryFromDB();
    } catch {
      throw new Error('Не удалось записать историю');
    }
  }

  function getGifts(id: number) {
    return useGiftsStore().history?.filter(history => history.secular_id === id);
  }

  return { seculars,
    getSecularsFromDB,
    getSecularsForCalendar,
    findSecular,
    changeSecularHidden,
    changeSecularObj,
    addSecular,
    takeGift,
    getGifts };
});

