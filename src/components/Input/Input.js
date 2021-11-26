import React from "react";
import "./Input.css";

class Input extends React.Component {

    componentDidMount() {
        if (this.props.id !== undefined) document.getElementById(this.props.id).focus();
    }

    render() {
        return (
            <input id={this.props.id} type={this.props.type} className={"input " + this.props.className} onKeyPress={this.props.onKeyPress} onChange={this.props.onChange}/>
        ); 
    }

}

export default Input;