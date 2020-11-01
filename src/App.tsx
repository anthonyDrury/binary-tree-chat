import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import ChatTreeExplorer from "./components/chatTree";
import { configureStore } from "./redux/store/store";

function App() {
  const store = configureStore();

  return (
    <div className="App">
      <h1>Binary Chat Tree</h1>
      <Provider store={store}>
        <ChatTreeExplorer></ChatTreeExplorer>
      </Provider>
    </div>
  );
}

export default App;
