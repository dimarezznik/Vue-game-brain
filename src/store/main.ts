import { loadStorageBoolean } from "@/storage";

export const main = {
  state: {
    panel: [
      { element: 1, id: 1 },
      { element: 2, id: 2 },
      { element: 3, id: 3 },
      { element: "<", id: 4 },
      { element: 4, id: 5 },
      { element: 5, id: 6 },
      { element: 6, id: 7 },
      { element: ">", id: 8 },
      { element: 7, id: 9 },
      { element: 8, id: 10 },
      { element: 9, id: 11 },
      { element: "?", id: 12 },
      { element: "", id: 13 },
      { element: 0, id: 14 },
      { element: "", id: 15 },
      { element: "=", id: 16 },
    ],
    options: loadStorageBoolean("options") || {},
  },
  mutations: {},
  getters: {
    getPanel(state: any) {
      return state.panel;
    },
    getOptions(state: any) {
      return state.options;
    },
  },
};
