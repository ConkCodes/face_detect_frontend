import React from "react";
import "./SignUp.css";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
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
        document.getElementById("nameInput").focus();
    }

    /*
	description: listens to the onChange event and sets the input value to name state.
	input: onChange event
	output: n/a
	*/
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    /*
	description: listens to the onChange event and sets the input value to email state.
	input: onChange event
	output: n/a
	*/
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    /*
	description: listens to the onChange event and sets the input value to password state.
	input: onChange event
	output: n/a
	*/
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    /*
	description: listens to the onKeyPress event and calls signUp() when the enter key is pressed.
	input: onKeyPress event
	output: n/a
	*/
    onEnterPress = (event) => {
        if (event.key === "Enter") this.signUp();
    }

    /*
	description: listens to the onClick event and calls the sign up function when the sign up button is clicked.
	input: n/a
	output: n/a
	*/
    onSignUpClick = () => {
        this.signUp();
    }

        /*
	description: attempts to sign up user, set user state in app.js, and send user to the home page.
	input: n/a
	output: n/a
	*/
    signUp = async () => {
        try {
            // attempt to sign up user
            const res = await fetch("http://localhost:3000/user/signUp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password})
            });
            const user = await res.json();
            // success -> set user state & switch to home page
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
            // fail -> throw error
            } else throw new Error(user);
        // error
        } catch (err) {
            // log error
            console.log(err);
        }
    }

    render() {
        return(
            <div className="card w-400 plr-80 ptb-48 m-auto mt-32">
                <p className="mt-0 fs-150 b">Sign Up</p>
                <p className="mb-0">Name</p>
                <input id="nameInput" onKeyPress={this.onEnterPress} onChange={this.onNameChange} type="text" className="input w-max bs-border"/>
                <p className="mb-0">Email</p>
                <input onKeyPress={this.onEnterPress} onChange={this.onEmailChange} type="text" className="input w-max bs-border"/>
                <p className="mb-0">Password</p>
                <input onKeyPress={this.onEnterPress} onChange={this.onPasswordChange} type="password" className="input w-max bs-border"/>
                <button onClick={this.onSignUpClick} className="button mt-16">Sign Up</button>
            </div>
        );
    }

}

export default SignUp;