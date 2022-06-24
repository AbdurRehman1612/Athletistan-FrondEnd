import React from "react";

import { SouthAmerica, Africa, Europe, Asia, NorthAmerica, Oceania } from "./";

export default class WorldMap extends React.Component {
  static defaultProps = {
    onContinentChange: () => {}
  };

  state = {
    continent: null
  };

  _setActiveContinent = continent => {
    this.setState(
      {
        continent: continent
      },
      () => {
        this.props.onContinentChange(this.state.continent);
      }
    );
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <svg
          className="map-img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 672 315"
          id="svg5249"
        >
          <defs id="defs5257">
            <linearGradient id="linearGradient4299">
              <stop offset="0" id="stop4301" stopColor="#cc5252" />
            </linearGradient>
            <linearGradient id="linearGradient4293">
              <stop offset="0" id="stop4295" stopColor="#84297f" />
            </linearGradient>
          </defs>

          <SouthAmerica
            onClick={() => this._setActiveContinent("south-america")}
          />

          <Africa onClick={() => this._setActiveContinent("africa")} />

          <Europe onClick={() => this._setActiveContinent("europe")} />

          <Asia onClick={() => this._setActiveContinent("asia")} />

          <NorthAmerica
            onClick={() => this._setActiveContinent("north-america")}
          />

          <Oceania onClick={() => this._setActiveContinent("ocenia")} />
        </svg>
      </div>
    );
  }
}
