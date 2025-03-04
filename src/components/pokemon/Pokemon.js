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

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    previousIndex: "",
    nextIndex: "",
    imageUrl: "",
    backImageUrl: "",
    shinyImageUrl: "",
    backShinyImageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    eggGroup: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    compareId: "error",
    favourites: [],
    pokemonInFavourites: false,
    linkClicked: false
  };

  async componentDidMount() {
    
    const { pokemonIndex } = this.props.match.params;
    const previousIndex = pokemonIndex - 1;
    const nextIndex = pokemonIndex - -1;
    
    var favourites = [];
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    //urls for poke info
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    //get pokemon info
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;
    const backImageUrl = pokemonRes.data.sprites.back_default;
    const shinyImageUrl = pokemonRes.data.sprites.front_shiny;
    const backShinyImageUrl = pokemonRes.data.sprites.back_shiny;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
      }
    });

    //convert Decimetres to feet
    const height =
      Math.round((pokemonRes.data.height * 0.238084 + 0.0001) * 100) / 100;

    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.0001) * 100) / 100;

    const types = pokemonRes.data.types.map(type => type.type.name);

    const abilities = pokemonRes.data.abilities.map(ability => {
      return ability.ability.name
        .toLowerCase()
        .split("-")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    });

    const evs = pokemonRes.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name}`
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    //Get Pokemon Description, Catch Rate, EggGroups etc
    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"]
        .map(group => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
        favourites,
        nextIndex,
        previousIndex
      });
    });

    this.setState({
      imageUrl,
      backImageUrl,
      shinyImageUrl,
      backShinyImageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      height,
      weight,
      abilities,
      evs,
      linkClicked: false
    });
  }

  handleChange(event) {
    this.setState({ compareId: event.target.value });
  }

 

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <h3 className="mx-auto">
                {this.state.pokemonIndex.length == 1
                  ? "00" + this.state.pokemonIndex
                  : this.state.pokemonIndex.length == 2
                  ? "0" + this.state.pokemonIndex
                  : this.state.pokemonIndex}
                :{" "}
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </h3>

              {this.state.types.map(type => (
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
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                ></img>
                <img
                  src={this.state.backImageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                ></img>
                <img
                  src={this.state.shinyImageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                ></img>
                <img
                  src={this.state.backShinyImageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                ></img>
              </div>

              <div className="col-9">
                <hr />
                <div className="row mt-1">
                  <div
                    className="col"
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <p>
                      {this.state.description.replace(
                        /[^a-zA-Z0-9 ,.éÉ]/g,
                        " "
                      )}
                    </p>

                    {this.state.favourites.indexOf(
                      `${this.state.pokemonIndex}&${this.state.name}`
                    ) === -1 ? (
                      <button
                        className="favourite-button"
                        onClick={() => {
                          var favouritesExpander = this.state.favourites || [];
                          favouritesExpander.push(
                            `${this.state.pokemonIndex}&${this.state.name}`
                          );
                          localStorage.setItem(
                            "favourites",
                            JSON.stringify(favouritesExpander)
                          );
                          this.setState({ pokemonInFavourites: true });
                        }}
                      >
                        Add this Pokemon to favourites
                      </button>
                    ) : (
                      <button
                        className="favourite-button"
                        onClick={() => {
                          var favouritesRemover = this.state.favourites || [];
                          var removalIndex = favouritesRemover.indexOf(
                            `${this.state.pokemonIndex}&${this.state.name}`
                          );
                          favouritesRemover.splice(removalIndex, 1);
                          localStorage.setItem(
                            "favourites",
                            JSON.stringify(favouritesRemover)
                          );
                          this.setState({ pokemonInFavourites: false });
                        }}
                      >
                        Remove this Pokemon from favourites
                      </button>
                    )}
                  </div>
                </div>
                <hr />
                <br />
                <div className="text-center mx-auto mb-4">
                  <h4 className="mx-auto">
                    Base stats for{" "}
                    {this.state.name
                      .toLowerCase()
                      .split(" ")
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ")}
                  </h4>
                </div>

                {/*HP stats. Max current stat is 255 so hp value percentage is 
                   calculated from that maximum */}
                <div className="row align-items-center">
                  <div className="col-12 col-md-4 col-sm-6 text-right">HP</div>
                  <div className="col-12 col-md-8 col-sm-6">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${(this.state.stats.hp / 255) * 100}%`,
                          backgroundColor: "green"
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
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
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${(this.state.stats.attack / 180) * 100}%`,
                          backgroundColor: "red"
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
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
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${(this.state.stats.defense / 230) * 100}%`,
                          backgroundColor: "darkOrange"
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
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
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${(this.state.stats.specialAttack / 180) *
                            100}%`,
                          backgroundColor: "purple"
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
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
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${(this.state.stats.specialDefense / 230) *
                            100}%`,
                          backgroundColor: "#CC3999"
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
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
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${(this.state.stats.speed / 180) * 100}%`,
                          backgroundColor: "darkBlue"
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="row align-items-center mt-3">
                  <div
                    className="mx-auto text-center"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                  >
                    Please enter the name or Pokedex number of Pokemon to
                    compare
                  </div>
                </div>
                <div className="row align-items-center mt-3">
                  <input
                    type="text"
                    className="mx-auto text-right"
                    id="compareId"
                    defaultValue=""
                    onChange={this.handleChange.bind(this)}
                  ></input>
                </div>
                <div className="row align-items-center mt-3">
                  <Link
                    to={`/comparison/${this.state.pokemonIndex}v${this.state.compareId}`}
                    className="mx-auto compare-button"
                  >
                    Compare{" "}
                    {this.state.name
                      .toLowerCase()
                      .split(" ")
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ")}{" "}
                    with this Pokemon
                  </Link>
                </div>
                <hr />
                <div className="row align-items-center mt-3">
                  <div className="col-12 text-center">
                    <br />
                    <h4 className="mx-auto">
                      Details for{" "}
                      {this.state.name
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </h4>
                    <br />
                    <div className="col-6 attribute-column-1 text-center mx-auto">
                      <div>
                        <span className="font-weight-bold">Height:</span>{" "}
                        {this.state.height} feet
                      </div>
                      <div>
                        <span className="font-weight-bold">Egg Groups:</span>{" "}
                        {this.state.eggGroups}
                      </div>
                      <div>
                        <span className="font-weight-bold">
                          Gender Ratio Male:
                        </span>{" "}
                        {this.state.genderRatioMale}%
                      </div>
                    </div>
                    <div className="col-6 attribute-column-2 text-center mx-auto">
                      <div>
                        <span className="font-weight-bold">Weight:</span>{" "}
                        {this.state.weight} lbs
                      </div>
                      <div>
                        <span className="font-weight-bold">
                          Steps to Hatch:
                        </span>{" "}
                        {this.state.hatchSteps}{" "}
                      </div>
                      <div>
                        <span className="font-weight-bold">
                          Gender Ratio Female:
                        </span>{" "}
                        {this.state.genderRatioFemale}%
                      </div>
                    </div>

                    <div className="col-12 attribute-column-3 text-center mx-auto">
                      <div>
                        <span className="font-weight-bold">Height:</span>{" "}
                        {this.state.height} feet
                      </div>
                      <div>
                        <span className="font-weight-bold">Egg Groups:</span>{" "}
                        {this.state.eggGroups}
                      </div>
                      <div>
                        <span className="font-weight-bold">
                          Gender Ratio Male:
                        </span>{" "}
                        {this.state.genderRatioMale}%
                      </div>
                      <div>
                        <span className="font-weight-bold">Weight:</span>{" "}
                        {this.state.weight} lbs
                      </div>
                      <div>
                        <span className="font-weight-bold">
                          Steps to Hatch:
                        </span>{" "}
                        {this.state.hatchSteps}{" "}
                      </div>
                      <div>
                        <span className="font-weight-bold">
                          Gender Ratio Female:
                        </span>{" "}
                        {this.state.genderRatioFemale}%
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <br />
                <div className="row align-items-center mt-3">
                  {this.state.previousIndex > 0 ? (
                    <Link
                      to={`/pokemonScroll/${this.state.previousIndex}`}
                      className="mx-auto compare-button"
                      
                    >
                      View Previous Pokemon
                    </Link>
                  ) : null}
                  {this.state.nextIndex < 808 ? (
                    <Link
                      to={`/pokemonScroll/${this.state.nextIndex}`}
                      className="mx-auto compare-button"
                    >
                      View Next Pokemon
                    </Link>
                  ) : null}
                </div>
                <br />
                <br />
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
