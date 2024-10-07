import React from "react"
import ReactDOM from "react-dom/client"

const el = document.getElementById("root")
const root = ReactDOM.createRoot(el)

function App(props) {
    return (
        <div>
            <h1>Hello my name is {props.name}</h1>
            <h2>and my job is {props.job}</h2>
        </div>
    )
}

function Data() {
    return (
        <div>
            {/* <App name= "kogie" job= "copywriter" /> */}
            <App name= "savy" job= "web developer" />
        </div>
    )
}

export default Data;