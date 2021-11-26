import React from "react";
import "./Input.css";

class Input extends React.Component {

    componentDidMount() {
        const emailInput = document.getElementById("emailInput");
        if (emailInput !== null) emailInput.focus();
        const nameInput = document.getElementById("nameInput");
        if (nameInput !== null) nameInput.focus();
        const urlInput = document.getElementById("urlInput");
        if (urlInput !== null) urlInput.focus();
    }

    render() {
        return (
            <input id={this.props.id} type={this.props.type} className={"input " + this.props.className} onKeyPress={this.props.onKeyPress} onChange={this.props.onChange}/>
        ); 
    }

}

export default Input;