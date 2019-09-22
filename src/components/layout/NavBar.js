import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div className ="col-12 text-center">
          <a className="navbar-brand" href='index.html'>
            National Pokedex
          </a>
          
          <Link className="navbar-brand dex" to="/pokedex/offset=0&limit=90">001-90</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=90&limit=90">91-180</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=180&limit=90">181-270</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=270&limit=90">271-360</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=360&limit=90">361-450</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=450&limit=90">451-540</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=540&limit=90">541-630</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=630&limit=90">631-720</Link>
          <Link className="navbar-brand dex" to="/pokedex/offset=720&limit=87">721-807</Link>
          </div>
        </nav>
      </div>
    );
  }
}
