import {
  loadStorage,
  loadStorageArray,
  loadStorageRange,
  loadStorageStatistic,
  setLocalStorage,
} from "@/storage";
import {
  DefaultRangeType,
  FieldsType,
  OperatorsType,
  PanelType,
  StatisticType,
} from "@/types/types";
import { createLogger } from "vuex";

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
    count: 0,
    showHint: false,
    showModalComplete: false,
    showModalError: false,
  },
  mutations: {
    clearFields(state: FieldsType) {
      state.fields = [];
    },
    clearStatistic(state: StatisticType) {
      state.statistic = {
        ...state.statistic,
        completeTasksSession: 0,
        allTasksSession: 0,
      };
      setLocalStorage("statistic", state.statistic);
    },
  },
  getters: {
    getModals(state: any) {
      return {
        showHint: state.showHint,
        showModalComplete: state.showModalComplete,
        showModalError: state.showModalError,
      };
    },
    getStatistic(state: StatisticType) {
      return state.statistic;
    },
    getOperators(state: OperatorsType) {
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
    getDefaultRange(state: DefaultRangeType) {
      return state.defaultRange;
    },
    getPanel(state: PanelType) {
      return state.panel;
    },
    getOptions(state: FieldsType) {
      return state.options;
    },
    getConfig(state: FieldsType) {
      return state.fields;
    },
    randomOperators(state: OperatorsType, getters: OperatorsType) {
      return getters.getOperators[
        Math.floor(Math.random() * getters.getOperators.length)
      ];
    },
    getExpression(state: FieldsType, getters: FieldsType) {
      const expr = getters.getConfig[0];
      if (expr) {
        const expr2 = expr.replaceAll("**", "^");
        const items = expr2.split("");
        return items.map((item: string) => (item === "^" ? "**" : item));
      }
    },
    Hint(state: FieldsType, getters: FieldsType) {
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

    tapNext(context: any, payload: any) {
      if (context.state.count + 1 >= context.getters.getExpression.length)
        return payload.ref["inp" + context.state.count][0].focus();
      return context.getters.getExpression.find(() => {
        context.state.count += 2;
        return payload.nextTick(() =>
          payload.ref["inp" + context.state.count][0].focus()
        );
      });
    },

    tapPrev(context: any, payload: any) {
      if (context.state.count <= 0)
        return payload.ref["inp" + context.state.count][0].focus();
      return context.getters.getExpression.find(() => {
        context.state.count -= 2;
        return payload.nextTick(() =>
          payload.ref["inp" + context.state.count][0].focus()
        );
      });
    },

    tapNumber(context: any, payload: any) {
      payload.ref["inp" + context.state.count][0].value += payload.el;
    },

    tapEqual(context: any, payload: any) {
      context.state.showModalComplete = false;
      context.state.showModalError = false;
      context.getters.getStatistic.allTasksSession++;
      context.getters.getStatistic.allTasks++;
      setLocalStorage("statistic", context.getters.getStatistic);
      let str = "";
      for (let i = 0; i <= context.getters.getExpression.length - 1; i++) {
        if (i % 2 === 0) {
          str += payload.ref["inp" + i][0].value;
        }
        if (i % 2 !== 0) {
          str += payload.ref["span" + i][0].innerText;
        }
      }
      for (let i = 0; i <= context.getters.getExpression.length - 1; i += 2) {
        if (!payload.ref["inp" + i][0].value) {
          context.state.showModalError = true;
          return context.dispatch("loadConfig");
        }
      }
      if (eval(str) === context.getters.getConfig[1]) {
        for (let i = 0; i <= context.getters.getExpression.length - 1; i += 2) {
          payload.ref["inp" + i][0].value = "";
        }
        context.getters.getStatistic.completeTasksSession++;
        context.getters.getStatistic.completeTasks++;
        setLocalStorage("statistic", context.getters.getStatistic);
        context.state.showModalComplete = true;
        return context.dispatch("loadConfig");
      } else {
        for (let i = 0; i <= context.getters.getExpression.length - 1; i += 2) {
          payload.ref["inp" + i][0].value = "";
        }
        context.state.showModalError = true;
        return context.dispatch("loadConfig");
      }
    },
  },
};
