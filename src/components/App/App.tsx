import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addCounter } from "../../redux/countersReducer";
import Header from "../Header/Header";
import Item from "../Item/Item";
import { Counter } from "../../utils/types";

function App(): React.ReactElement {
  const [contextMenuId, setContextMenuId] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state);
  const counters = store.counters;
  const maxNumber = 9007199254740991;

  function createCounter() {
    const startData = counters
      .map((item: Counter) => {
        return +item.body;
      })
      .reduce((p, i) => {
        return p + i;
      }, 0);
    let number;

    if (startData < maxNumber) {
      number = startData;
    } else {
      number = maxNumber;
    }
    const counter = {
      id: "",
      body: number,
      timer: false,
      title: undefined,
      caption: undefined,
    };

    if ((counters.length + 1) % 4 === 0) {
      counter.timer = true;
    }
    dispatch(addCounter({ counter }));
  }

  return (
    <>
      <Header />
      <main>
        <button className="add" onClick={createCounter}>
          Создать счётчик
        </button>
        <section className="list">
          {counters.map((counter) => (
            <Item
              key={counter.id}
              id={counter.id}
              counter={counter}
              contextMenuId={contextMenuId}
              setContextMenuId={setContextMenuId}
            />
          ))}
        </section>
      </main>
      <footer>
        <time>2022</time>
        <a href="https://github.com/loki87by" target="_blank" rel="noreferrer">
          © Алексей Акулич
        </a>
      </footer>
    </>
  );
}

export default App;
