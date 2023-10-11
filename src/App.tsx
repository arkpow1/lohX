import React from "react";
import "./App.css";
import { LohX, createStore, useLohX } from "./state-manager";

const Test = () => {
  const store = useLohX("second");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div className="card">
      <h3>This component using store "second" </h3>
      <p> count from LohX is {store.count}</p>
      <p> id from LohX is {store.id}</p>
      <button
        onClick={() => {
          store.count++;
        }}
      >
        count++
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

const Test2 = () => {
  const store = useLohX("second");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div className="card">
      <h3>This component using store "second" </h3>
      <p> count from LohX is {store.count}</p>
      <p> id from LohX is {store.id}</p>
      <button
        onClick={() => {
          store.count++;
          store.count++;
          store.count++;
          store.count++;
          store.id = crypto.randomUUID();
        }}
      >
        (count++ 4 times and add id)
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

const Test3 = () => {
  const [firstStore, secondStore] = useLohX(["first", "second"]);

  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div className="card">
      <h3>This component using store "first" and store "second" </h3>
      <p> count from LohX is {firstStore.count}</p>
      <button
        onClick={() => {
          firstStore.count++;
        }}
      >
        count++ in "first"
      </button>
      <button
        onClick={() => {
          secondStore.count++;
        }}
      >
        count++ in "second"
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

const Test4 = () => {
  const store = useLohX("first");

  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div className="card">
      <h3>This component using store "first"</h3>
      <p> count from LohX is {store.count}</p>
      <p>second deep proxy, value is {store.demo.value}</p>
      <button
        onClick={() => {
          // store.count++;
          store.demo.value *= 2;
        }}
      >
        change deep object value in "first"
      </button>
      <button
        onClick={() => {
          store.count++;
        }}
      >
        count++ in "first"
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

createStore("second", { count: 0, id: null });
createStore("first", { count: 10000, demo: { value: 2 } });

function App() {
  return (
    <LohX>
      <Test />
      <Test2 />
      <Test3 />
      <Test4 />
    </LohX>
  );
}

export default App;
