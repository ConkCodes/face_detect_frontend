import React from "react";
import "./Input.css";

class Input extends React.Component {

    componentDidMount() {
        const input = document.getElementsByClassName("focus")[0];
        if (input !== undefined) input.focus();
    }

    render() {
        if (this.props.readOnly === undefined) {
            return (
                <input id={this.props.id} type={this.props.type} placeholder={this.props.placeHolder} className={"input " + this.props.className} onKeyPress={this.props.onKeyPress} onChange={this.props.onChange}/>
            ); 
        } else {
            return (
                <input id={this.props.id} type={this.props.type} placeholder={this.props.placeHolder} className={"input " + this.props.className} onKeyPress={this.props.onKeyPress} onChange={this.props.onChange} readOnly/>
            ); 
        }
    }

}

export default Input;