import React from "react";

const contextsMap = new Map();
const storesMap = new Map();

export const useLohX = (storeName) =>
  React.useContext(contextsMap.get(storeName));

export const createStore = (name, store) => {
  storesMap.set(name, store);
  contextsMap.set(name, React.createContext({}));
};

const createRecursiveContext = (contexts, children, index = 0) => {
  if (contexts.length === 0) {
    return children;
  }
  const [key, Component] = contexts[index];
  if (index === contexts.length - 1) {
    return (
      <Component.Provider value={storesMap.get(key)}>
        {children}
      </Component.Provider>
    );
  }

  return (
    <Component.Provider value={storesMap.get(key)}>
      {createRecursiveContext(contexts, children, index + 1)}
    </Component.Provider>
  );
};

export const LohX = ({ children }) => {
  const [, setTrigger] = React.useState(false);
  const isInitial = React.useRef(true);

  const entries = [...storesMap.entries()];

  entries.forEach(([itemKey, itemValue]) => {
    const makeProxy = (obj) => {
      return new Proxy(obj, {
        set: (target, key, value) => {
          target[key] = value;
          storesMap.set(itemKey, makeProxy(itemValue));

          setTrigger((prev) => !prev);
          return true;
        },
      });
    };

    if (isInitial.current) {
      storesMap.set(itemKey, makeProxy(itemValue));
    }
  });

  isInitial.current = false;

  return createRecursiveContext([...contextsMap.entries()], children);
};
