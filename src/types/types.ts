export interface StatisticType {
  statistic: {
    completeTasksSession: number;
    allTasksSession: number;
    allTasks: number;
    completeTasks: number;
  };
}

export interface FieldsType {
  getExpression: FieldsType[];
  getConfig: Array<string>;
  options: FieldsType;
  fields: FieldsType[];
  sum: boolean;
  diff: boolean;
  degree: boolean;
  mult: boolean;
  division: boolean;
}

export interface DefaultRangeType {
  defaultRange: DefaultRangeType;
  minRange: number;
  maxComplexityRange: number;
  maxTimeRange: number;
  step: number;
  timeRange: number;
  complexityRange: number;
}

export interface PanelType {
  panel: PanelType[];
  element: number | string;
  id: number;
}

export interface OperatorsType {
  getOperators: Array<string>;
  operators: Array<string>;
}
