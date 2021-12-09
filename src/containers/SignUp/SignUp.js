import React from "react";
import "./SignUp.css";
import Form from "../../components/Form/Form.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";

const initialState = {
    name: "",
    email: "",
    password: ""
}

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onEnterPress = (event) => {
        if (event.key === "Enter") this.signUp();
    }

    onSignUpClick = () => {
        this.signUp();
    }

    signUp = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/signUp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password})
            });
            const status = res.status;
            const user = await res.json();
            if (status !== 201) throw new Error(user);
            this.props.loadUser(user);
            this.props.onRouteChange("home");
        } catch (err) {
            alert(err);
            this.setState(initialState);
            document.getElementById("nameInput").value = "";
            document.getElementById("emailInput").value = "";
            document.getElementById("passwordInput").value = "";
        }
    }

    render() {
        return (
            <Form className="signForm">
                <h1 className="mt-0">Sign Up</h1>
                <p className="mb-0">Name</p>
                <Input id="nameInput" onKeyPress={this.onEnterPress} onChange={this.onNameChange} type="text" className="signInput focus"/>
                <p className="mb-0">Email</p>
                <Input id="emailInput" onKeyPress={this.onEnterPress} onChange={this.onEmailChange} type="text" className="signInput"/>
                <p className="mb-0">Password</p>
                <Input id="passwordInput" onKeyPress={this.onEnterPress} onChange={this.onPasswordChange} type="password" className="signInput"/>
                <Button onClick={this.onSignUpClick} text="Sign Up" className="signButton"/>
            </Form>
        );
    }

}

export default SignUp;