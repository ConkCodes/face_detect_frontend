import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    /*
    description: sets focus to first input on page load.
    input: n/a
    output: n/a
    */
    componentDidMount() {
        document.getElementById("emailInput").focus();
    }

    /*
	description: listens to the onChange event and sets the input value to email state.
	input: onChange event
	output: n/a
	*/
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

	/*
	description: listens to the onChange event and sets the input value to password state.
	input: onChange event
	output: n/a
	*/
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

	/*
	description: 
        listens to the onClick event on the sign in button.
        attempts to find user in the database.
        if valid user, user is loaded to user state in app.js and route is changed to home.
        if invalid user, user must try to sign in again.
	input: n/a
	output: n/a
	*/
    onSignInClick = async () => {
        try {
            const res = await fetch("http://localhost:3000/signIn", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            const user = await res.json();
            if (user.id)  {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return(
            <div className="card w-400 plr-80 ptb-48 m-auto mt-32">
                <p className="mt-0 fs-150 b">Sign In</p>
                <p className="mb-0">Email</p>
                <input id="emailInput" onChange={this.onEmailChange} type="text" className="input w-max bs-border"/>
                <p className="mb-0">Password</p>
                <input onChange={this.onPasswordChange} type="password" className="input w-max bs-border"/>
                <button onClick={this.onSignInClick} className="button mt-16">Sign In</button>
                <p className="mb-0">Don't have an account? <span onClick={() => this.props.onRouteChange("signUp")}className="link">Sign up</span></p>
            </div>
        );
    }

}

export default SignIn;