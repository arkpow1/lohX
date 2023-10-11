import React from "react";

const contextsMap = new Map();
const storesMap = new Map();

export const useLohX = (storeName) => {
  return React.useContext(contextsMap.get(storeName));
};

export const createStore = (name, store) => {
  if (!storesMap.has(name)) {
    storesMap.set(name, store);
    contextsMap.set(name, React.createContext(null));
  }
};

const createRecursiveContext = (contexts, children, index = 0) => {
  if (contexts.length === 0) {
    return children;
  }
  const [key, Component] = contexts[index];

  return (
    <Component.Provider value={storesMap.get(key)}>
      {index === contexts.length - 1
        ? children
        : createRecursiveContext(contexts, children, index + 1)}
    </Component.Provider>
  );
};

export const LohX = ({ children }) => {
  const [, setTrigger] = React.useState(false);
  const timeouts = React.useRef<any[]>({});
  const isInitial = React.useRef(true);

  [...storesMap.entries()].forEach(([itemKey, itemValue]) => {
    const makeProxy = (obj) => {
      return new Proxy(obj, {
        set: (target, key, value) => {
          const entries = Object.entries(timeouts.current);
          target[key] = value;

          clearTimeout(timeouts.current[itemKey]);
          timeouts.current[itemKey] = setTimeout(() => {
            entries.forEach(([key, value]) => delete timeouts.current[key]);
            storesMap.set(itemKey, makeProxy(itemValue));

            setTrigger((prev) => !prev);
            clearTimeout(timeouts.current[itemKey]);
          }, 0);
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
