import React, {Component} from "react";

import "./search-panel.css"

export default class SearchPanel extends Component {

    onChanging = (e) => {
        this.props.onSearch(e.target.value);
    }

    render () {

        return (
            <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={this.onChanging} />
        );
    };
};
