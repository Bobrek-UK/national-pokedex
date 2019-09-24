import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styled from "styled-components";

import loading from "../pokemon/loading.gif";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCardFavourite extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    shinyImageUrl: "",
    imageLoading: true,
    tooManyRequests: false
  };

  async componentDidMount() {
    const { favourites } = this.props;
    const pokemonIndex = favourites.split("&")[0];
    const name = favourites.split("&")[1];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png?raw=true`; //address taken from pokemon api
    const shinyImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonIndex}.png?raw=true`; //address taken from pokemon api

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
      shinyImageUrl
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`../pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            {/*Card header is populated with pokedex number from API, enforced to 3 digit length minimum */}
            <h5 className="card-header text-center">
              {this.state.pokemonIndex.length == 1
                ? "00" + this.state.pokemonIndex
                : this.state.pokemonIndex.length == 2
                ? "0" + this.state.pokemonIndex
                : this.state.pokemonIndex}
            </h5>
            {this.state.imageLoading ? (
              <img
                src={loading}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
              ></img>
            ) : null}
            <Sprite
              className="card-img-center rounded mx-auto mt-2"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ tooManyRequests: true })}
              src={this.state.imageUrl}
              style={
                this.state.tooManyRequests
                  ? { display: "none" }
                  : this.state.imageLoading
                  ? null
                  : { display: "block" }
              }
            />

            {this.state.tooManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  Too Many Requests
                </span>
              </h6>
            ) : null}
            <div className="card-body mx-auto">
              <h6 className="card-title text-center">
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    letter =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </h6>
              <Sprite
                className="card-img-top rounded mx-auto mt-2"
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ tooManyRequests: true })}
                src={this.state.shinyImageUrl}
                style={
                  this.state.tooManyRequests
                    ? { display: "none" }
                    : this.state.imageLoading
                    ? null
                    : { display: "block" }
                }
              />
              {this.state.tooManyRequests ? (
                <h6 className="mx-auto">
                  <span className="badge badge-danger mt-2">
                    Too Many Requests
                  </span>
                </h6>
              ) : null}
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
