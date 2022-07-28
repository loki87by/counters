import React from "react";
import { useDispatch } from "react-redux";
import { editCounter } from "../../redux/countersReducer";
import { ItemProps } from "../../utils/types";
import Timer from "../Timer/Timer";

function Item(props: ItemProps): React.ReactElement {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(props.counter.body);

  function UpdateCounterData(arg: boolean) {
    const obj = {
      body: state,
      id: props.counter.id,
    };

    if (arg) {
      setState(state + 1);
      obj.body = state + 1;
    } else {
      setState(state - 1);
      obj.body = state - 1;
    }
    dispatch(editCounter(obj));
  }

  return (
    <div id={props.counter.id}>
      {props.counter.timer ? (
        <Timer
          id={props.counter.id}
          body={props.counter.body}
        />
      ) : (
        <div className="counter">
          <div className="counter__content">
            <h3 className="counter__body">{state}</h3>
            <div className="counter__buttons">
              <button
                className="counter__button"
                onClick={() => {
                  UpdateCounterData(true);
                }}
              >
                +
              </button>
              <button
                className="counter__button"
                onClick={() => {
                  UpdateCounterData(false);
                }}
              >
                -
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
