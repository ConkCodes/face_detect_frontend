import React from "react";
import "./SignIn.css";
import Input from "../../components/Input/Input.js";

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
            <div className="card w-400 plr-80 ptb-48 m-auto">
                <p className="mt-0 fs-150 b">Sign In</p>
                <p className="mb-0">Email</p>
                <Input id="emailInput" onKeyPress={this.onEnterPress} onChange={this.onEmailChange} type="text" className="w-max"/>
                <p className="mb-0">Password</p>
                <Input onKeyPress={this.onEnterPress} onChange={this.onPasswordChange} type="password" className="w-max"/>
                <button onClick={this.onSignInClick} className="button mt-16">Sign In</button>
                <p className="mb-0">Don't have an account? <span onClick={() => this.props.onRouteChange("signUp")}className="link">Sign up</span></p>
            </div>
        );
    }

}

export default SignIn;