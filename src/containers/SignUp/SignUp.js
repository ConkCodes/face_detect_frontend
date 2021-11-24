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

    componentDidMount() {
        document.getElementById("nameInput").focus();
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
            if (res.status !== 201) throw new Error(await res.json());
            this.props.loadUser(await res.json());
            this.props.onRouteChange("home");
        } catch (err) {
            alert(err);
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