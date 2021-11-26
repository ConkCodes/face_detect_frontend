import React from "react";
import "./Input.css";

class Input extends React.Component {

    componentDidMount() {
        document.getElementById("detectInput").focus();
    }

    render() {
        return (
            <input id="detectInput" type={this.props.type} className={"input " + this.props.className}/>
        ); 
    }

}

export default Input;