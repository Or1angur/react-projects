import React, { Component } from "react";

import "./item-add-form.css"

export default class ItemAddForm extends Component {

    state = {
        label: ""
    }

    onLableChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmitted = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmitted}>

                <input
                    type="text"
                    className="form-control"
                    onChange={this.onLableChange}
                    placeholder="What you need to do?"
                    value={this.state.label}/>

                <button
                    className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        )
    }
}