import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.scss";
import ChatTreeExplorer from "./components/chatTree/chatTree";
import reducer from "./redux/reducers/reducer";

function App() {
  const store = createStore(reducer);

  return (
    <div className="App">
      <Provider store={store}>
        <ChatTreeExplorer></ChatTreeExplorer>
      </Provider>
    </div>
  );
}

export default App;
