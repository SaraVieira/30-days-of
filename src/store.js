import create from "zustand";
import { addMonths } from "date-fns";
import { post, getAll, getOrderedData } from "./utils/fetch";

export const useStore = create((set, get) => ({
  data: null,
  currentPageData: null,
  getData: async () => {
    const data = await getAll();
    set({ data });
  },
  getChallenge: async (name) => {
    const data = get().data;
    const { rsp, ordered } = await getOrderedData(name);
    if (!data || !data.find((item) => item.name === name)) {
      set({ data: rsp, currentPageData: ordered });

      return;
    }

    set({ currentPageData: data.find((a) => a.name === name) });
  },
  refetchChallenge: async (name) => {
    const { rsp, ordered } = await getOrderedData(name);
    set({ data: rsp, currentPageData: ordered });
  },
  addEntry: async (form) => {
    const currentPageData = get().currentPageData;
    const newItem = {
      ...currentPageData,
      items: [
        ...currentPageData.items,
        { ...form, date: new Date(form.date).toString() },
      ],
    };
    await post(`${currentPageData.name}/${currentPageData._id}`, newItem);
  },
  addChallenge: async (name, data) => {
    const challenge = {
      name,
      date: new Date(data.date),
      finalDate: addMonths(new Date(data.date), 1),
      items: [],
    };
    console.log(name);

    await post(name, challenge);
  },
}));
