import React, { createContext, useContext, useEffect, useState } from "react";

/*
1. Introduction to Context API
Context API is used in React to share data globally (like user, theme, language)
without passing props manually at every level (prop drilling).
*/

/* 2. Create Context (with default value) */
const UserContext = createContext({ name: "Guest" });
const CounterContext = createContext();
const ThemeContext = createContext("light");

export default function App() {
  /* 7 & 9. Dynamic Context Value + Update with useState */
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  /* 13. Context with API Data */
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <UserContext.Provider value={user || { name: "Loading..." }}>
      <CounterContext.Provider value={{ count, setCount }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div style={{ padding: 20 }}>
            <h2>React Context API – Single File Demo</h2>

            {/* 6. Default Context Value (used below without provider example) */}
            <DefaultUser />

            {/* 3–5. Provider + useContext + Siblings */}
            <SiblingA />
            <SiblingB />

            {/* 8. Nested Context Access */}
            <Parent />

            {/* 12. Theme Toggle */}
            <ThemeBox />

            {/* 11. Conditional Rendering with Context */}
            <ConditionalRender />

            {/* 10. Multiple Contexts */}
            <MultipleContexts />
          </div>
        </ThemeContext.Provider>
      </CounterContext.Provider>
    </UserContext.Provider>
  );
}

/* 4. Access Context with useContext */
function SiblingA() {
  const { count, setCount } = useContext(CounterContext);
  return (
    <div>
      <p>Sibling A Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

/* 5. Multiple Components with same Context */
function SiblingB() {
  const { count } = useContext(CounterContext);
  return <p>Sibling B Count: {count}</p>;
}

/* 6. Default Context Value (no provider) */
function DefaultUser() {
  const user = useContext(UserContext);
  return <p>Default / API User: {user.name}</p>;
}

/* 8. Nested Context Access */
function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  const { count } = useContext(CounterContext);
  return <p>Nested Count: {count}</p>;
}

/* 10. Multiple Contexts in one component */
function MultipleContexts() {
  const user = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <p>
      User: {user.name} | Theme: {theme}
    </p>
  );
}

/* 11. Conditional Rendering with Context */
function ConditionalRender() {
  const { count } = useContext(CounterContext);
  return <p>{count % 2 === 0 ? "Even Count" : "Odd Count"}</p>;
}

/* 12. Theme Toggle using Context */
function ThemeBox() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        background: theme === "light" ? "#eee" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
