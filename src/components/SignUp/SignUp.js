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
	description: 
	input: 
	output: 
	*/
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    /*
	description: 
	input: 
	output: 
	*/
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    /*
	description: 
	input: 
	output: 
	*/
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    /*
	description: 
	input: 
	output: 
	*/
    onSignUpClick = async () => {
        try {
            const res = await fetch("http://localhost:3000/signUp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            });
            const user = await res.json();
            if (user === "email already exists in the database") console.log(user);
            else {
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
                <p className="mt-0 fs-150 b">Sign Up</p>
                <p className="mb-0">Name</p>
                <input onChange={this.onNameChange} type="text" className="input w-max bs-border"/>
                <p className="mb-0">Email</p>
                <input onChange={this.onEmailChange} type="text" className="input w-max bs-border"/>
                <p className="mb-0">Password</p>
                <input onChange={this.onPasswordChange} type="password" className="input w-max bs-border"/>
                <button onClick={this.onSignUpClick} className="button mt-16">Sign Up</button>
            </div>
        );
    }

}

export default SignUp;