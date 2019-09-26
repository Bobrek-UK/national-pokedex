import React, { Component } from 'react'
import { Redirect } from "react-router-dom";



export default class PokemonScroll extends Component {

  state = {pokemonIndex: ""}

  componentDidMount(){
      
      const { pokemonIndex } = this.props.match.params;
      this.setState({pokemonIndex})
      
  }

  render() {
    return (
      <div>
          {this.state.pokemonIndex ? (<Redirect to={`../pokemon/${this.state.pokemonIndex}`} />) : null}
      </div>
    )
  }
}
