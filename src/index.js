import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render( 
<BrowserRouter>
    <React.StrictMode >
    <StateProvider initialState = { initialState }reducer = { reducer } >
    <App/>
    </StateProvider>{" "} 
    </React.StrictMode>{" "}
     </BrowserRouter>,
    document.getElementById("root")
);