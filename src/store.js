import create from "zustand";

export const useStore = create((set, get) => ({
  data: null,
  currentPageData: null,
  getData: async () => {
    const rsp = await fetch("https://legitbackend.wtf/challenges").then((d) =>
      d.json()
    );
    set({ data: rsp });
  },
  getChallenge: async (name) => {
    const data = get().data;

    if (!data) {
      const rsp = await fetch("https://legitbackend.wtf/challenges").then((d) =>
        d.json()
      );

      set({ data: rsp, currentPageData: rsp.find((a) => a.name === name) });

      return;
    }

    set({ currentPageData: data.find((a) => a.name === name) });
  },
  addEntry: async (form) => {
    const data = get().data;
    const newItem = {
      ...data,
      items: [...data.items, { ...form, date: new Date().toString() }],
    };
    await fetch(`${process.env.REACT_APP_API}${data.name}/${data._id}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "put",
      body: JSON.stringify(newItem),
    }).then((rsp) => rsp.json());
  },
}));
