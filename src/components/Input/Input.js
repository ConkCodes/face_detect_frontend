import React from "react";
import "./Input.css";

class Input extends React.Component {

    componentDidMount() {
        if (this.props.id !== undefined) document.getElementById(this.props.id).focus();
    }

    render() {
        if (this.props.readOnly === true) {
            return (
                <input id={this.props.id} type={this.props.type} placeholder={this.props.placeHolder} className={"input " + this.props.className} onKeyPress={this.props.onKeyPress} onChange={this.props.onChange} readOnly/>
            ); 
        } else if (this.props.readOnly === false) {
            return (
                <input id={this.props.id} type={this.props.type} placeholder={this.props.placeHolder} className={"input " + this.props.className} onKeyPress={this.props.onKeyPress} onChange={this.props.onChange}/>
            ); 
        }

    }

}

export default Input;