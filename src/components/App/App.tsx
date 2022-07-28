import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addCounter } from "../../redux/countersReducer";
import Header from '../Header/Header'
import Item from '../Item/Item'
import { Counter } from "../../utils/types";

function App(): React.ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state);
  const counters = store.counters;

  function createCounter() {
    const startData = counters.map((item: Counter) => {
      return +item.body
    }).reduce((p, i) => { return p + i }, 0)
    const counter = {
      id: "",
      body: startData,
      timer: false
    };

    if ((counters.length + 1) % 4 === 0) {
      counter.timer = true
    }
    dispatch(addCounter({counter}));
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
            <Item key={counter.id} counter={counter} />
          ))}
        </section>
      </main>
      <footer>
        <time>2022</time>
        <a href="" target="_blank">
          © Алексей Акулич
        </a>
      </footer>
    </>
  );
}

export default App;
