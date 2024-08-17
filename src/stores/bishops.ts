/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { supabase } from '../libs/supabase.ts';
import { Database } from '../types/supabase.ts';
import dayjs from 'dayjs';
import { checkDate } from '../libs/day.ts';
import { IBishop, IOptions } from '../types/types.ts';
import { useGiftsStore } from './gifts.ts';

export const useBishopsStore = defineStore('bishops', () => {
  const bishops : Ref<Array<Database['public']['Tables']['BISHOPS']['Row']> | null> = ref([]);
  const hiddenBishops = computed(() => bishops.value?.filter(bishop => !bishop.hidden));

  async function getBishopsFromDB() {
    const { data: BISHOPS } = await supabase.from('BISHOPS').select('*');
    bishops.value = BISHOPS;
  }

  function getBishopsForCalendar(dateCalendar: dayjs.Dayjs, option:IOptions) {
    const bishopDate = hiddenBishops.value?.filter(bishop => checkDate(dateCalendar, bishop.date_birth, option.birth)
      || checkDate(dateCalendar, bishop.date_angel, option.angel)
      || checkDate(dateCalendar, bishop.date_death, option.death)
      || checkDate(dateCalendar, bishop.date_ordination, option.bishop)
      || checkDate(dateCalendar, bishop.date_tonsure, option.tonsure));
    return bishopDate;
  }

  function findBishop(id:number) {
    return bishops.value?.find(bishop => bishop.id === id);
  }

  async function changeBishopHidden(id:number, newHidden:boolean) {
    try {
      await supabase
        .from('BISHOPS')
        .update({ hidden: newHidden })
        .eq('id', id);
      await getBishopsFromDB();
    } catch {
      throw new Error('Не удалось изменить видимость в календаре');
    }
  }
  async function changeBishopObj(id:number, newObj:Database['public']['Tables']['BISHOPS']['Row']) {
    try {
      await supabase
        .from('BISHOPS')
        .update(newObj)
        .eq('id', id);

      await getBishopsFromDB();
    } catch {
      throw new Error('Не удалось изменить данные');
    }
  }
  async function addBishop(bishop: IBishop) {
    try {
      await supabase
        .from('BISHOPS')
        .insert([bishop]);
      await getBishopsFromDB();
    } catch {
      throw new Error('Не удалось добавить');
    }
  }

  async function takeGift(giftID:number, count: number, bishopID: number) {
    try {
      await useGiftsStore().changeGiftStorage(giftID, count);
      await supabase.from('HISTORY').insert([{ count, gift: giftID, bishop_id: bishopID }]);
      await useGiftsStore().getHistoryFromDB();
    } catch {
      throw new Error('Не удалось записать историю');
    }
  }

  function getGifts(id: number) {
    return useGiftsStore().history?.filter(history => history.bishop_id === id);
  }

  return { bishops,
    getBishopsFromDB,
    findBishop,
    getBishopsForCalendar,
    changeBishopHidden,
    changeBishopObj,
    addBishop,
    takeGift,
    getGifts };
});

