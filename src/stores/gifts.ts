/* eslint-disable max-lines-per-function */
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { supabase } from '../libs/supabase.ts';
import { Database } from '../types/supabase.ts';
import { IGift, IHistory } from '../types/types.ts';

export const useGiftsStore = defineStore('gifts', () => {
  const gifts : Ref<Array<Database['public']['Tables']['GIFTS']['Row']> | null> = ref([]);
  const history: Ref<Array<IHistory> | null> = ref([]);

  async function getGiftsFromDB() {
    const { data: GIFTS } = await supabase.from('GIFTS')
      .select('*')
      .order('count', { ascending: false });
    if (GIFTS) gifts.value = GIFTS;
  }

  async function changeGiftStorage(giftID:number, count: number) {
    const oldCount = gifts.value?.find(gift => gift.id === giftID)?.count;
    try {
      if (oldCount) {
        await supabase.from('GIFTS')
          .update({ count: oldCount - count })
          .eq('id', giftID);
        await getGiftsFromDB();
      } else throw new Error('Не удалось списать подарок');
    } catch {
      throw new Error('Не удалось списать подарок');
    }
  }

  function findGift(id:number) {
    return gifts.value?.find(gift => gift.id === id);
  }
  function findGiftHistory(id:number) {
    return history.value?.filter(gift => gift.GIFTS?.id === id);
  }

  async function changeGiftInfo(giftID: number, newObj:Database['public']['Tables']['GIFTS']['Row']) {
    try {
      await supabase
        .from('GIFTS')
        .update(newObj)
        .eq('id', giftID);
      await getGiftsFromDB();
    } catch {
      throw new Error('Не удалось изменить данные');
    }
  }

  async function addGift(gift: IGift) {
    try {
      await supabase
        .from('GIFTS')
        .insert([gift]);
      await getGiftsFromDB();
    } catch {
      throw new Error('Не удалось добавить');
    }
  }

  async function getHistoryFromDB() {
    try {
      const { data: HISTORY } = await supabase
        .from('HISTORY')
        .select('id, create_date, count, GIFTS ( id, name ), bishop_id, priest_id, secular_id ');
      history.value = HISTORY;
    } catch {
      throw new Error('Не получилось получить историю подарков');
    }
  }

  return { gifts,
    history,
    getGiftsFromDB,
    changeGiftInfo,
    findGift,
    findGiftHistory,
    addGift,
    changeGiftStorage,
    getHistoryFromDB };
});

