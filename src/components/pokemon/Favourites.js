import React, { Component } from 'react'



export default class Favourites extends Component {

    state = {
        favourites:''
    };

    async componentDidMount(){
        var favourites = [];
        favourites = JSON.parse(localStorage.getItem("favourites"));

        this.setState({
            favourites
        })
    }


    render() {
        return (
            <div>
                <div>{this.state.favourites}</div>
            </div>
        )
    }
}
