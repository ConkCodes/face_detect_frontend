import React from "react";
import "./SignIn.css";
import Form from "../../components/Form/Form.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onEnterPress = (event) => {
        if (event.key === "Enter") this.signIn();
    }

    onSignInClick = () => {
        this.signIn();
    }

    signIn = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/signIn", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });
            const status = res.status;
            const user = await res.json();
            if (status !== 200) throw new Error(user);
            this.props.loadUser(user);
            this.props.onRouteChange("home");
        } catch (err) {
            alert(err);
        }
    }

    render() {
        return (
            <Form className="form1">
                <h1 className="mt-0">Sign In</h1>
                <p className="mb-0">Email</p>
                <Input id="emailInput" onKeyPress={this.onEnterPress} onChange={this.onEmailChange} type="text" readOnly={false} className="input1"/>
                <p className="mb-0">Password</p>
                <Input onKeyPress={this.onEnterPress} onChange={this.onPasswordChange} type="password" readOnly={false} className="input1"/>
                <Button onClick={this.onSignInClick} text="Sign In" className="button1"/>
                <p className="mb-0">Don't have an account? <span onClick={() => this.props.onRouteChange("signUp")}className="link">Sign up</span></p>
            </Form>
        );
    }

}

export default SignIn;