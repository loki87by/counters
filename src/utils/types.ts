import { Dispatch, SetStateAction } from "react";

export interface Counter {
  id: string;
  body: number;
  timer?: boolean;
  title: string | undefined;
  caption: string | undefined;
}

export interface ItemProps {
  counter: Counter;
  id: string;
  contextMenuId: string;
  setContextMenuId: Dispatch<SetStateAction<string>>;
}

export interface TimerProps {
  counter: Counter;
  id: string;
  index?: number;
  isTimerReset: boolean;
  setTimerReset: Dispatch<SetStateAction<boolean>>;
}

export interface StringifyData {
  [key: string]: string;
}

export type IntervalFunction = () => unknown | void;
