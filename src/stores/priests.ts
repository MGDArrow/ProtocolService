/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { supabase } from '../libs/supabase.ts';
import { Database } from '../types/supabase.ts';
import dayjs from 'dayjs';
import { checkDate } from '../libs/day.ts';
import { IOptions, IPriest } from '../types/types.ts';
import { useGiftsStore } from './gifts.ts';

export const usePriestsStore = defineStore('priests', () => {
  const priests : Ref<Array<Database['public']['Tables']['PRIESTS']['Row']> | null> = ref([]);
  const hiddenPriests = computed(() => priests.value?.filter(priest => !priest.hidden));

  async function getPriestsFromDB() {
    const { data: PRIESTS } = await supabase.from('PRIESTS').select('*');
    priests.value = PRIESTS;
  }

  function getPriestsForCalendar(dateCalendar: dayjs.Dayjs, option: IOptions) {
    const priestDate = hiddenPriests.value?.filter(priest => checkDate(dateCalendar, priest.date_birth, option.birth)
      || checkDate(dateCalendar, priest.date_death, option.death)
      || checkDate(dateCalendar, priest.date_deacon, option.deacon && priest.date_priest === null)
      || checkDate(dateCalendar, priest.date_priest, option.priest));
    return priestDate;
  }

  function findPriest(id:number) {
    return priests.value?.find(priest => priest.id === id);
  }

  async function changePriestHidden(id:number, newHidden:boolean) {
    try {
      await supabase
        .from('PRIESTS')
        .update({ hidden: newHidden })
        .eq('id', id);
      await getPriestsFromDB();
    } catch {
      throw new Error('Не удалось изменить видимость в календаре');
    }
  }
  async function changePriestObj(id:number, newObj:Database['public']['Tables']['PRIESTS']['Row']) {
    try {
      await supabase
        .from('PRIESTS')
        .update(newObj)
        .eq('id', id);

      await getPriestsFromDB();
    } catch {
      throw new Error('Не удалось изменить данные');
    }
  }
  async function addPriest(priest: IPriest) {
    try {
      await supabase
        .from('PRIESTS')
        .insert([priest]);
      await getPriestsFromDB();
    } catch {
      throw new Error('Не удалось добавить');
    }
  }

  async function takeGift(giftID:number, count: number, priestID: number) {
    try {
      await useGiftsStore().changeGiftStorage(giftID, count);
      await supabase.from('HISTORY').insert([{ count, gift: giftID, priest_id: priestID }]);
      await useGiftsStore().getHistoryFromDB();
    } catch {
      throw new Error('Не удалось записать историю');
    }
  }

  function getGifts(id: number) {
    return useGiftsStore().history?.filter(history => history.priest_id === id);
  }

  return { priests,
    getPriestsFromDB,
    getPriestsForCalendar,
    findPriest,
    changePriestHidden,
    changePriestObj,
    addPriest,
    takeGift,
    getGifts };
});

