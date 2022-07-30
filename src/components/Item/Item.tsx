import React from "react";
import { useDispatch } from "react-redux";
import {
  editCounter,
  editCounterTitle,
  editCounterCaption,
} from "../../redux/countersReducer";
import { ItemProps, StringifyData, Counter } from "../../utils/types";
import Timer from "../Timer/Timer";

function Item(props: ItemProps): React.ReactElement {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(props.counter.body);
  const [title, setTitle] = React.useState(props.counter.title);
  const [caption, setCaption] = React.useState(props.counter.caption);
  const [isTimerReset, setTimerReset] = React.useState(false);
  const [isShowInput, setShowInput] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState("");
  const [currentInputValue, setCurrentInputValue] = React.useState("");
  const [contextMenuData, setContextMenuData] = React.useState<StringifyData>({
    top: "auto",
    left: "auto",
    bottom: "auto",
    right: "auto",
  });

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

  function closeContextMenu() {
    const data = {
      left: `auto`,
      top: `auto`,
      bottom: "auto",
      right: "auto",
    };
    setContextMenuData(data);
    props.setContextMenuId("");
  }

  function openContextMenu(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const oldContextMenu = document.querySelector(
      ".counter__contextMenu_opened"
    );

    if (oldContextMenu) {
      oldContextMenu.classList.remove("counter__contextMenu_opened");
      oldContextMenu.classList.add("false");
    }
    const html = document.querySelector("html");
    const data = { top: "auto", left: "auto", bottom: "auto", right: "auto" };

    if (html && e.clientX < html.clientWidth / 2) {
      data.left = `${e.clientX}px`;
      data.top = `${e.clientY}px`;
    }

    if (html && e.clientX > html.clientWidth / 2) {
      data.right = `${html.clientWidth - e.clientX}px`;
      data.top = `${e.clientY}px`;
    }

    if (data) {
      setContextMenuData(data);
    }
    props.setContextMenuId(props.id);
    document.addEventListener("click", () => {
      closeContextMenu();
    });
  }

  function editTitle() {
    setShowInput(true);
    setCurrentInput("title");
    setCurrentInputValue(title || "");
    closeContextMenu();
  }

  function editCaption() {
    setShowInput(true);
    setCurrentInput("caption");
    setCurrentInputValue(caption || "");
    closeContextMenu();
  }

  function editValue() {
    setShowInput(true);
    setCurrentInput("state");
    setCurrentInputValue(`${state}`);
    closeContextMenu();
  }

  function saveInputData() {
    const obj = {
      id: props.counter.id,
    } as Counter;

    if (currentInput === "title") {
      setTitle(currentInputValue);
      obj.title = title;
      dispatch(editCounterTitle(obj));
    }

    if (currentInput === "caption") {
      setCaption(currentInputValue);
      obj.caption = caption;
      dispatch(editCounterCaption(obj));
    }

    if (currentInput === "state") {
      setState(+currentInputValue);
      obj.body = +currentInputValue;
      dispatch(editCounter(obj));
    }
    setShowInput(false);
    setCurrentInput("");
  }

  function handlePressEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      saveInputData();
    }
  }

  function editInputValue(e: React.KeyboardEvent<HTMLInputElement>) {
    const newValue = (e.target as HTMLInputElement).value;
    setCurrentInputValue(newValue);
  }

  function reset() {
    const obj = {
      body: 0,
      id: props.counter.id,
    };
    setTimerReset(true);
    setState(0);
    dispatch(editCounter(obj));
    closeContextMenu();
  }

  return (
    <div
      className="list-item"
      id={props.counter.id}
      onContextMenu={openContextMenu}
    >
      {isShowInput && currentInput === "title" ? (
        <div className="counter__title">
          <input
            type="text"
            value={currentInputValue}
            placeholder="Введите текст"
            maxLength={10}
            onInput={editInputValue}
            onKeyPress={handlePressEnter}
            autoFocus={true}
            style={{ width: "80%" }}
          />
          <button onClick={saveInputData}>ok</button>
        </div>
      ) : (
        <h3 className="counter__title">{title}</h3>
      )}
      {props.contextMenuId === props.id ? (
        <div
          style={{
            left: contextMenuData.left,
            top: contextMenuData.top,
            right: contextMenuData.right,
            bottom: contextMenuData.bottom,
          }}
          className="counter__contextMenu"
        >
          <h4 onClick={editTitle}>Добавить/изменить заголовок</h4>
          <h4 onClick={editCaption}>Добавить/изменить подпиcь</h4>
          {!props.counter.timer ? (
            <h4 onClick={editValue}>Корректировать значение</h4>
          ) : (
            ""
          )}
          <h4 onClick={reset}>Обнулить счётчик</h4>
        </div>
      ) : (
        ""
      )}
      {props.counter.timer ? (
        <Timer
          id={props.counter.id}
          counter={props.counter}
          isTimerReset={isTimerReset}
          setTimerReset={setTimerReset}
        />
      ) : (
        <div
          className="counter"
          style={
            isShowInput && currentInput === "state" ? { width: "50%" } : {}
          }
        >
          <div
            className={`counter__content ${
              isShowInput && currentInput === "state" && "counter__body_input"
            }`}
          >
            {isShowInput && currentInput === "state" ? (
              <div className="counter__body counter__body_input">
                <input
                  type="number"
                  value={currentInputValue}
                  placeholder=""
                  maxLength={10}
                  onInput={editInputValue}
                  onKeyPress={handlePressEnter}
                  autoFocus={true}
                  style={{ width: "100%" }}
                />
                <button className="counter__button" onClick={saveInputData}>
                  ok
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
      {isShowInput && currentInput === "caption" ? (
        <div className="counter__caption">
          <input
            type="text"
            value={currentInputValue}
            placeholder="Введите текст"
            maxLength={10}
            onInput={editInputValue}
            onKeyPress={handlePressEnter}
            autoFocus={true}
            style={{ width: "80%" }}
          />
          <button onClick={saveInputData}>ok</button>
        </div>
      ) : (
        <h4 className="counter__caption">{caption}</h4>
      )}
    </div>
  );
}

export default Item;
