import create from "zustand";
import { addMonths } from "date-fns";

const call = () => fetch(process.env.REACT_APP_API).then((d) => d.json());

const getOrderedData = async (name) => {
  const rsp = await call();
  const pageData = rsp.find((a) => a.name === name);
  const ordered = {
    ...pageData,
    items: pageData.items.sort((a, b) => new Date(a.date) - new Date(b.date)),
  };

  return { rsp, ordered };
};

export const useStore = create((set, get) => ({
  data: null,
  currentPageData: null,
  getData: async () => {
    const data = await call();
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
        { ...form, date: new Date().toString() },
      ],
    };
    await fetch(
      `${process.env.REACT_APP_API}${currentPageData.name}/${currentPageData._id}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "put",
        body: JSON.stringify(newItem),
      }
    ).then((rsp) => rsp.json());
  },
  addChallenge: async (name, data) => {
    const challenge = {
      name,
      date: new Date(data.date),
      finalDate: addMonths(new Date(data.date), 1),
      items: [],
    };

    await fetch(process.env.REACT_APP_API + name, {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify(challenge),
    }).then((rsp) => rsp.json());
  },
}));
