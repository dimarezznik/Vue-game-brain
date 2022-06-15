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
    statistic: loadStorageStatistic("statistic"),
    panel: [
      { element: 1 },
      { element: 2 },
      { element: 3 },
      { element: "<" },
      { element: 4 },
      { element: 5 },
      { element: 6 },
      { element: ">" },
      { element: 7 },
      { element: 8 },
      { element: 9 },
      { element: "?" },
      { element: "" },
      { element: 0 },
      { element: "" },
      { element: "=" },
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
      // state.statistic.completeTasksSession = 0;
      // state.statistic.allTasksSession = 0;
      // setLocalStorage("statistic", state.statistic);
      console.log(state.statistic);
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
      const expression = getters.getConfig[0];
      if (expression) {
        const items = expression.replaceAll("**", "^").split("");
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
      let arr = [];
      for (let i = 0; i <= loadStorageRange("complexityRange") * 2; i++) {
        if (i % 2 === 0) {
          arr.push(Math.floor(Math.random() * 10));
        } else {
          arr.push(context.getters.randomOperators);
        }
      }
      context.getters.getConfig.push(arr.join(""));
      context.getters.getConfig.push(eval(arr.join("")));
      setLocalStorage("statistic", context.state.statistic);
      setLocalStorage("config", context.getters.getConfig);
    },

    tapNext(context: any, payload: any) {
      if (context.state.count + 1 >= context.getters.getExpression.length) {
        return payload.ref["inp" + context.state.count][0].focus();
      }
      return context.getters.getExpression.find(() => {
        context.state.count += 2;
        return payload.nextTick(() =>
          payload.ref["inp" + context.state.count][0].focus()
        );
      });
    },

    tapPrev(context: any, payload: any) {
      if (context.state.count <= 0) {
        return payload.ref["inp" + context.state.count][0].focus();
      }
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
