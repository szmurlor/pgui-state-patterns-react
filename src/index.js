import React from "react";
import ReactDOM from "react-dom";
import { DataSet } from "./data.js";

import "./styles.css";

class Form extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Pokaz kontroli stanu</h1>
          <div className="row">
            {DataSet.stations.map(s => {
              return <div className="col-sm">{s.name}</div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Form />, rootElement);
