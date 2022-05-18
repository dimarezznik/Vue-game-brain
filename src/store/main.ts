import {
  loadStorage,
  loadStorageArray,
  loadStorageRange,
  loadStorageStatistic,
  setLocalStorage,
} from "@/storage";
import { StatisticType } from "@/types/types";

// @ts-ignore
export const main = {
  state: {
    defaultRange: {
      minRange: 1,
      maxComplexityRange: 10,
      maxTimeRange: 15,
      step: 1,
      timeRange: loadStorageRange("timeRange"),
      complexityRange: loadStorageRange("complexityRange"),
    },
    statistic: {
      completeTasksSession:
        loadStorageStatistic("statistic").completeTasksSession || 0,
      allTasksSession: loadStorageStatistic("statistic").allTasksSession || 0,
      allTasks: loadStorageStatistic("statistic").allTasks || 0,
      completeTasks: loadStorageStatistic("statistic").completeTasks || 0,
    },
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
    fields: loadStorageArray("config") || [],
    options: loadStorage("options") || {
      sum: false,
      diff: false,
      mult: false,
      division: false,
      degree: false,
    },
    operators: [],
  },
  mutations: {
    clearFields(state: any) {
      state.fields = [];
    },
    clearStatistic(state: any) {
      state.statistic = {
        ...state.statistic,
        completeTasksSession: 0,
        allTasksSession: 0,
      };
      setLocalStorage("statistic", state.statistic);
    },
  },
  getters: {
    getStatistic(state: StatisticType) {
      return state.statistic;
    },
    getOperators(state: any) {
      if (loadStorage("options").sum === true) {
        state.operators.push("+");
      }
      if (loadStorage("options").diff === true) {
        state.operators.push("-");
      }
      if (loadStorage("options").mult === true) {
        state.operators.push("*");
      }
      if (loadStorage("options").division === true) {
        state.operators.push("/");
      }
      if (loadStorage("options").degree === true) {
        state.operators.push("**");
      }
      return state.operators;
    },
    getDefaultRange(state: any) {
      return state.defaultRange;
    },
    getPanel(state: any) {
      return state.panel;
    },
    getOptions(state: any) {
      return state.options;
    },
    getConfig(state: any) {
      return state.fields;
    },
    randomOperators(context: any, getters: any) {
      return getters.getOperators[
        Math.floor(Math.random() * getters.getOperators.length)
      ];
    },
    getExpression(context: any, getters: any) {
      const expr = getters.getConfig[0];
      if (expr) {
        const expr2 = expr.replaceAll("**", "^");
        const items = expr2.split("");
        return items.map((item: string) => (item === "^" ? "**" : item));
      }
    },
    Hint(context: any, getters: any) {
      return getters.getExpression.join("");
    },
  },
  actions: {
    loadConfig(context: any) {
      context.state.fields = [];
      if (
        !loadStorage("options").sum &&
        !loadStorage("options").diff &&
        !loadStorage("options").mult &&
        !loadStorage("options").degree &&
        !loadStorage("options").division
      )
        return;
      let arr = [];
      do {
        arr = [];
        for (let i = 0; i <= loadStorageRange("complexityRange") * 2; i++) {
          if (i % 2 === 0) {
            arr.push(Math.floor(Math.random() * 10));
          } else {
            arr.push(context.getters.randomOperators);
          }
        }
      } while (
        !Number.isInteger(eval(arr.join(""))) ||
        eval(arr.join("")) >= 1000 ||
        eval(arr.join("")) <= 0 ||
        eval(arr.join("")) === Infinity
      );
      context.getters.getConfig.push(arr.join(""));
      context.getters.getConfig.push(eval(arr.join("")));
      setLocalStorage("statistic", context.state.statistic);
      setLocalStorage("config", context.getters.getConfig);
    },
  },
};
