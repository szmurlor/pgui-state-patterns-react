import React from "react";
import ReactDOM from "react-dom";
import { DataSet } from "./data.js";

import "./styles.css";

function Field(props) {
  var readOnly = "editable" in props ? !props.editable : true;
  return (
    <li>
      <span>{props.label}:</span>
      <span>
        <input
          type="text"
          readOnly={readOnly}
          value={props.value}   
          onChange={props.onChange}            
        />
      </span>
    </li>
  );
}

class Station extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var s = this.props.station;
    return (
      <div className="details">
        <form>
          <ul>
            <Field label="Identyfikator" value={s.name} />
            <Field label="Data pomiaru" value={s.date} />
            <Field label="Oczekiwana" value={s.expected} />
            <Field
              label="Zmierzona"
              value={s.value}
              editable={true}  
              onChange={e => {
                this.props.onChangedValue(this.props.station, e.target.value);
              }}            
            />
            <Field
              label="Różnica"
              value={s.value - s.expected || "-"} /* Wartość domyślna: "-" */
            />
          </ul>
        </form>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }

  selected = (e) => {
    var selected = undefined;
    var k = e.target.value;
    for (var idx in DataSet.stations) {
      var s = DataSet.stations[idx];
      if (s.id === parseInt(k)) {
        selected = s;
        break;
      }
    }
    this.setState({
      selected: selected
    });
  };

  onChangedValue = (station, v) => {
    if (this.state.selected && this.state.selected.id == station.id) {
      this.setState(state => {
        if (!v || isNaN(v)) {
          state.selected.value = 0;
        } else {
          state.selected.value = parseInt(v);
        }

        return state;
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Pokaz kontroli stanu</h1>
          <div className="row">
            <div className="col-4">
              <select
                className="stations"
                name="stations"
                onChange={this.selected}
                multiple
              >
                {DataSet.stations.map(s => {
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-4">
                {this.state.selected ?
                <Station station={this.state.selected}
                onChangedValue={this.onChangedValue} /> :
                <div>Wybierz stację...</div>
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Form />, rootElement);
