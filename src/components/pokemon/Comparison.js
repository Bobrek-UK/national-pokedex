import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "82351D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

export default class Comparison extends Component {
  state = {
    oneName: "",
    onePokemonIndex: "",
    oneImageUrl: "",
    oneTypes: [],
    oneStats: {
      oneHp: "",
      oneAttack: "",
      oneDefense: "",
      oneSpeed: "",
      oneSpecialAttack: "",
      oneSpecialDefense: ""
    },
    twoName: "",
    twoPokemonIndex: "",
    twoImageUrl: "",
    twoTypes: [],

    twoStats: {
      twoHp: "",
      twoAttack: "",
      twoDefense: "",
      twoSpeed: "",
      twoSpecialAttack: "",
      twoSpecialDefense: ""
    }
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;
    const onePokemonIndex = pokemonIndex.split("v")[0];
    const twoPokemonIndex = pokemonIndex.split("v")[1];

    //urls for poke info for first pokemon being compared
    const onePokemonUrl = `https://pokeapi.co/api/v2/pokemon/${onePokemonIndex}/`;
    //urls for poke info for second pokemon being compared
    const twoPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${twoPokemonIndex}/`;

    //get pokemon info for first pokemon being compared
    const onePokemonRes = await axios.get(onePokemonUrl);
    //get pokemon info for second pokemon being compared
    const twoPokemonRes = await axios.get(twoPokemonUrl);

    //parse pokemon info for first pokemon being compared
    const oneName = onePokemonRes.data.name;
    const oneImageUrl = onePokemonRes.data.sprites.front_default;
    const oneTypes = onePokemonRes.data.types.map(type => type.type.name);
    //this returns the dex number of the pokemon if the comparison was done by the user entering the pokemon's name rather than dex number
    const twoPokemonIndexToNumber = twoPokemonRes.data.species.url
      .replace(/[^0-9]/g, "")
      .substring(1);

    let {
      oneHp,
      oneAttack,
      oneDefense,
      oneSpeed,
      oneSpecialAttack,
      oneSpecialDefense
    } = "";

    onePokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          oneHp = stat["base_stat"];
          break;
        case "attack":
          oneAttack = stat["base_stat"];
          break;
        case "defense":
          oneDefense = stat["base_stat"];
          break;
        case "speed":
          oneSpeed = stat["base_stat"];
          break;
        case "special-attack":
          oneSpecialAttack = stat["base_stat"];
          break;
        case "special-defense":
          oneSpecialDefense = stat["base_stat"];
          break;
      }
    });

    //parse pokemon info for second pokemon being compared
    const twoName = twoPokemonRes.data.name;
    const twoImageUrl = twoPokemonRes.data.sprites.front_default;
    const twoTypes = twoPokemonRes.data.types.map(type => type.type.name);

    let {
      twoHp,
      twoAttack,
      twoDefense,
      twoSpeed,
      twoSpecialAttack,
      twoSpecialDefense
    } = "";

    twoPokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          twoHp = stat["base_stat"];
          break;
        case "attack":
          twoAttack = stat["base_stat"];
          break;
        case "defense":
          twoDefense = stat["base_stat"];
          break;
        case "speed":
          twoSpeed = stat["base_stat"];
          break;
        case "special-attack":
          twoSpecialAttack = stat["base_stat"];
          break;
        case "special-defense":
          twoSpecialDefense = stat["base_stat"];
          break;
      }
    });

    this.setState({
      onePokemonIndex,
      twoPokemonIndex,
      twoPokemonIndexToNumber,
      oneName,
      twoName,
      oneImageUrl,
      twoImageUrl,
      oneStats: {
        oneHp,
        oneAttack,
        oneDefense,
        oneSpecialAttack,
        oneSpecialDefense,
        oneSpeed
      },
      twoStats: {
        twoHp,
        twoAttack,
        twoDefense,
        twoSpecialAttack,
        twoSpecialDefense,
        twoSpeed
      },
      oneTypes,
      twoTypes
    });
  }

  render() {
    if (this.state.twoName != "") {
      return (
        <div className="col">
          {/*Start of card for first pokemon */}

          <div className="card">
            <div className="card-header">
              <div className="row">
                <h3 className="mx-auto">
                  {this.state.onePokemonIndex.length == 1
                    ? "00" + this.state.onePokemonIndex
                    : this.state.onePokemonIndex.length == 2
                    ? "0" + this.state.onePokemonIndex
                    : this.state.onePokemonIndex}
                  :{" "}
                  {this.state.oneName
                    .toLowerCase()
                    .split(" ")
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </h3>

                {this.state.oneTypes.map(type => (
                  <span
                    key={type}
                    className="badge badge-primary badge-pill mr-2 float-right"
                    style={{
                      backgroundColor: `#${TYPE_COLORS[type]}`,
                      color: "white",
                      width: "100px",
                      paddingTop: "6px"
                    }}
                  >
                    <h5>
                      {type.charAt(0).toUpperCase() +
                        type.substring(1).toLowerCase()}
                    </h5>
                  </span>
                ))}
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-top">
                <div
                  className="col-3"
                  style={{
                    borderRight: "1px solid #c2c2c2"
                  }}
                >
                  <img
                    src={this.state.oneImageUrl}
                    className="card-img-top rounded mx-auto mt-2"
                  ></img>
                </div>

                <div className="col-9">
                  <div className="text-center mx-auto mb-4">
                    <h4 className="mx-auto">
                      Base stats for{" "}
                      {this.state.oneName
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </h4>
                  </div>

                  {/*HP stats. Max current stat is 255 so hp value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      HP
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneHp / 255) *
                              100}%`,
                            backgroundColor: "green"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.oneStats.oneHp}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoHp / 255) *
                              100}%`,
                            backgroundColor: "transparent"
                            //borderRight: "2px solid grey" (This adds width to stat making it wrong so this was replaced with stat-bar div)
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.oneStats.oneHp -
                            this.state.twoStats.twoHp >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.oneStats
                              .oneHp - this.state.twoStats.twoHp}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.oneStats.oneHp -
                                this.state.twoStats.twoHp}
                            </span>
                          )}{" "}
                          HP
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Attack stat. Max current stat is 180 so attack value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Attack
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneAttack / 180) *
                              100}%`,
                            backgroundColor: "red"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.oneStats.oneAttack}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoAttack / 180) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.oneStats.oneAttack -
                            this.state.twoStats.twoAttack >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.oneStats
                              .oneAttack -
                              this.state.twoStats.twoAttack}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.oneStats.oneAttack -
                                this.state.twoStats.twoAttack}
                            </span>
                          )}{" "}
                          Att
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Defense stat. Max current stat is 230 so defense value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Defense
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneDefense / 230) *
                              100}%`,
                            backgroundColor: "darkOrange"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.oneStats.oneDefense}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoDefense / 230) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.oneStats.oneDefense -
                            this.state.twoStats.twoDefense >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.oneStats
                              .oneDefense -
                              this.state.twoStats.twoDefense}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.oneStats.oneDefense -
                                this.state.twoStats.twoDefense}
                            </span>
                          )}{" "}
                          Def
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Special attack stat. Max current stat is 180 so Special attack value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Special Attack
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneSpecialAttack /
                              180) *
                              100}%`,
                            backgroundColor: "purple"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.oneStats.oneSpecialAttack}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoSpecialAttack /
                              180) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.oneStats.oneSpecialAttack -
                            this.state.twoStats.twoSpecialAttack >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.oneStats
                              .oneSpecialAttack -
                              this.state.twoStats.twoSpecialAttack}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.oneStats.oneSpecialAttack -
                                this.state.twoStats.twoSpecialAttack}
                            </span>
                          )}{" "}
                          SA
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Special defense stat. Max current stat is 230 so special defense value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Special Defense
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneSpecialDefense /
                              230) *
                              100}%`,
                            backgroundColor: "#CC3999"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.oneStats.oneSpecialDefense}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoSpecialDefense /
                              230) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.oneStats.oneSpecialDefense -
                            this.state.twoStats.twoSpecialDefense >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.oneStats
                              .oneSpecialDefense -
                              this.state.twoStats.twoSpecialDefense}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.oneStats.oneSpecialDefense -
                                this.state.twoStats.twoSpecialDefense}
                            </span>
                          )}{" "}
                          SD
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Speed stat. Max current stat is 180 so speed value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Speed
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneSpeed / 180) *
                              100}%`,
                            backgroundColor: "darkBlue"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.oneStats.oneSpeed}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoSpeed / 180) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.oneStats.oneSpeed -
                            this.state.twoStats.twoSpeed >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.oneStats
                              .oneSpeed - this.state.twoStats.twoSpeed}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.oneStats.oneSpeed -
                                this.state.twoStats.twoSpeed}
                            </span>
                          )}{" "}
                          Spe
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mt-3">
                    <Link
                      to={`/pokemon/${this.state.onePokemonIndex}`}
                      className="mx-auto"
                    >
                      View more information for{" "}
                      {this.state.oneName
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Start of card for Second pokemon */}
          <div className="card mt-3">
            <div className="card-header">
              <div className="row">
                <h3 className="mx-auto">
                  {this.state.twoPokemonIndexToNumber.length == 1
                    ? "00" + this.state.twoPokemonIndexToNumber
                    : this.state.twoPokemonIndexToNumber.length == 2
                    ? "0" + this.state.twoPokemonIndexToNumber
                    : this.state.twoPokemonIndexToNumber}
                  :{" "}
                  {this.state.twoName
                    .toLowerCase()
                    .split(" ")
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </h3>

                {this.state.twoTypes.map(type => (
                  <span
                    key={type}
                    className="badge badge-primary badge-pill mr-2 float-right"
                    style={{
                      backgroundColor: `#${TYPE_COLORS[type]}`,
                      color: "white",
                      width: "100px",
                      paddingTop: "6px"
                    }}
                  >
                    <h5>
                      {type.charAt(0).toUpperCase() +
                        type.substring(1).toLowerCase()}
                    </h5>
                  </span>
                ))}
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-top">
                <div
                  className="col-3"
                  style={{
                    borderRight: "1px solid #c2c2c2"
                  }}
                >
                  <img
                    src={this.state.twoImageUrl}
                    className="card-img-top rounded mx-auto mt-2"
                  ></img>
                </div>

                <div className="col-9">
                  <div className="text-center mx-auto mb-4">
                    <h4 className="mx-auto">
                      Base stats for{" "}
                      {this.state.twoName
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </h4>
                  </div>

                  {/*HP stats. Max current stat is 255 so hp value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      HP
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoHp / 255) *
                              100}%`,
                            backgroundColor: "green"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.twoStats.twoHp}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneHp / 255) *
                              100}%`,
                            backgroundColor: "transparent"
                            //borderRight: "2px solid grey" (This adds width to stat making it wrong)
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.twoStats.twoHp -
                            this.state.oneStats.oneHp >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.twoStats
                              .twoHp - this.state.oneStats.oneHp}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.twoStats.twoHp -
                                this.state.oneStats.oneHp}
                            </span>
                          )}{" "}
                          HP
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Attack stat. Max current stat is 180 so attack value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Attack
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoAttack / 180) *
                              100}%`,
                            backgroundColor: "red"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.twoStats.twoAttack}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneAttack / 180) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.twoStats.twoAttack -
                            this.state.oneStats.oneAttack >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.twoStats
                              .twoAttack -
                              this.state.oneStats.oneAttack}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.twoStats.twoAttack -
                                this.state.oneStats.oneAttack}
                            </span>
                          )}{" "}
                          Att
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Defense stat. Max current stat is 230 so defense value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Defense
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoDefense / 230) *
                              100}%`,
                            backgroundColor: "darkOrange"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.twoStats.twoDefense}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneDefense / 230) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.twoStats.twoDefense -
                            this.state.oneStats.oneDefense >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.twoStats
                              .twoDefense -
                              this.state.oneStats.oneDefense}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.twoStats.twoDefense -
                                this.state.oneStats.oneDefense}
                            </span>
                          )}{" "}
                          Def
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Special attack stat. Max current stat is 180 so Special attack value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Special Attack
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoSpecialAttack /
                              180) *
                              100}%`,
                            backgroundColor: "purple"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.twoStats.twoSpecialAttack}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneSpecialAttack /
                              180) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.twoStats.twoSpecialAttack -
                            this.state.oneStats.oneSpecialAttack >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.twoStats
                              .twoSpecialAttack -
                              this.state.oneStats.oneSpecialAttack}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.twoStats.twoSpecialAttack -
                                this.state.oneStats.oneSpecialAttack}
                            </span>
                          )}{" "}
                          SA
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Special defense stat. Max current stat is 230 so special defense value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Special Defense
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoSpecialDefense /
                              230) *
                              100}%`,
                            backgroundColor: "#CC3999"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.twoStats.twoSpecialDefense}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneSpecialDefense /
                              230) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.twoStats.twoSpecialDefense -
                            this.state.oneStats.oneSpecialDefense >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.twoStats
                              .twoSpecialDefense -
                              this.state.oneStats.oneSpecialDefense}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.twoStats.twoSpecialDefense -
                                this.state.oneStats.oneSpecialDefense}
                            </span>
                          )}{" "}
                          SD
                        </small>
                      </div>
                    </div>
                  </div>

                  {/*Speed stat. Max current stat is 180 so speed value percentage is 
                   calculated from that maximum */}
                  <div className="row align-items-center">
                    <div className="col-12 col-md-4 col-sm-6 text-right">
                      Speed
                    </div>
                    <div className="col-12 col-md-8 col-sm-6">
                      <div className="progress wrapper">
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.twoStats.twoSpeed / 180) *
                              100}%`,
                            backgroundColor: "darkBlue"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.twoStats.twoSpeed}</small>
                        </div>
                        <div
                          className="progress-bar internal-bar"
                          role="progressBar"
                          style={{
                            width: `${(this.state.oneStats.oneSpeed / 180) *
                              100}%`,
                            backgroundColor: "transparent"
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small style={{ color: "transparent" }}>.</small>
                          <div className="stat-bar"></div>
                        </div>
                        <small className="stat-difference">
                          {this.state.twoStats.twoSpeed -
                            this.state.oneStats.oneSpeed >=
                          0 ? (
                            <span className="plus-stat">{`+${this.state.twoStats
                              .twoSpeed - this.state.oneStats.oneSpeed}`}</span>
                          ) : (
                            <span className="minus-stat">
                              {this.state.twoStats.twoSpeed -
                                this.state.oneStats.oneSpeed}
                            </span>
                          )}{" "}
                          Spe
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mt-3">
                    <Link
                      to={`/pokemon/${this.state.twoPokemonIndex}`}
                      className="mx-auto"
                    >
                      View more information for{" "}
                      {this.state.twoName
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="text-center">
          <div>
            The Pokemon for comparison was not found. Please ensure the spelling
            or dex number is correct
          </div>
          <hr />
          <Link to="/">Return to home</Link>
        </div>
      );
  }
}
