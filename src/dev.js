import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { notipoi, Notipoix3 } from './index.js';
class DevModules extends Component {
    componentDidMount() {
        notipoi.add("default", '1', "시발!");
        notipoi.add("primary", '2', "시발!");
        notipoi.add("success", '3', "시발!");
        notipoi.add("warning", '4', "시발!");
        notipoi.add("danger", '5', "시발!");

    }
    render() {
        return (
            <Notipoix3 position="bottom-left" />
        );
    }
}

export default DevModules;


ReactDOM.render(<DevModules />, document.getElementById('app'));