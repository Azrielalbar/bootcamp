import React from "react";
import ReactDOM from "react-dom/client";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, my name is {this.props.name}</h1>
                <h2>and my job is {this.props.job}</h2>
            </div>
        );
    }
}

class Data extends React.Component {
    render() {
        return (
            <div>
                <App name="kogie" job="copywriter" />
                <App name="savy" job="web developer" />
            </div>
        );
    }
}

export default Data;
