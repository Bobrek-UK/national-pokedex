import React, { Component } from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";

export default class Pokedex extends Component {
  state = {
    url: "",
    pokemon: null
  };

  async componentDidMount() {
    const { pokedex } = this.props.match.params;
    const url = `https://pokeapi.co/api/v2/pokemon?${pokedex}`;
    const res = await axios.get(url);
    this.setState({ pokemon: res.data["results"] });
  }

  async componentDidUpdate() {
    const { pokedex } = this.props.match.params;
    const url = `https://pokeapi.co/api/v2/pokemon?${pokedex}`;
    const res = await axios.get(url);
    this.setState({ pokemon: res.data["results"] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <h1>Loading Pokemon</h1>
        )}
      </React.Fragment>
    );
  }
}
