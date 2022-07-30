import React from "react";
import { useDispatch } from "react-redux";
import { editCounter } from "../../redux/countersReducer";
import { TimerProps, IntervalFunction } from "../../utils/types";

function Timer(props: TimerProps): React.ReactElement {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(props.counter.body);

  const UpdateCounterData = React.useCallback(() => {
    const obj = {
      body: state + 1,
      id: props.id,
    };
    setState(state + 1);
    dispatch(editCounter(obj));
  }, [dispatch, props.id, state]);

  function useInterval(callback: IntervalFunction, delay: number) {
    const savedCallback = React.useRef<IntervalFunction | null>(null);

    React.useEffect(() => {
      savedCallback.current = callback;
    });

    React.useEffect(() => {
      if (props.isTimerReset) {
        setState(0);
        props.setTimerReset(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isTimerReset]);

    React.useEffect(() => {
      function tick() {
        if (savedCallback.current !== null) {
          savedCallback.current();
        }
      }
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  useInterval(() => {
    UpdateCounterData();
  }, 1000);

  return (
    <div id={props.id} className="counter">
      <h3 className="counter__body">{state}</h3>
    </div>
  );
}

export default Timer;
