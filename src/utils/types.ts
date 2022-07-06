export interface Counter {
  id: string;
  body: number;
  timer?: boolean;
}

export interface ItemProps {
  counter: Counter;
  index: number;
  len: number;
}

export interface TimerProps extends Counter {
  index: number
}

export type IntervalFunction = () => ( unknown | void )