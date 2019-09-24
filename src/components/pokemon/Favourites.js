import React, { Component } from "react";
import PokemonCardFavourite from "./PokemonCardFavourite";

export default class Favourites extends Component {
  state = {
    favourites: []
  };

  async componentDidMount() {
    var favourites = [];
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    this.setState({
      favourites
    });
  }

  render() {
    return (
      <React.Fragment>
        {!(
          this.state.favourites === undefined ||
          this.state.favourites.length === 0
        ) ? (
          <div className="row">
            <div className="text-center favourites-header">
              <h1>Your Favourite Pokemon</h1>
            </div>

            {this.state.favourites.map(favourites => (
              <PokemonCardFavourite key={favourites} favourites={favourites} />
            ))}
          </div>
        ) : (
          <h3 className="text-center">
            You have not yet added any favourite Pokemon
            <br />
            <br /> Why not try adding some? <br /> <br />
            You can browse Pokemon by the Dex Numbers above
          </h3>
        )}
      </React.Fragment>
    );
  }
}
