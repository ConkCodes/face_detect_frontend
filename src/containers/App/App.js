import React from "react";
import './App.css';
import Particles from "react-tsparticles";
import Navigation from "../../components/Navigation/Navigation.js";
import SignIn from "../SignIn/SignIn.js";
import SignUp from "../SignUp/SignUp.js";
import Home from "../Home/Home.js";

// customize particles.js
const particlesOptions = {
	background: {
		color: {
			value: "#0d47a1",
		},
	},
	fpsLimit: 60,
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: "push",
			},
			onHover: {
				enable: true,
				mode: "repulse",
			},
			resize: true,
		},
		modes: {
			bubble: {
				distance: 400,
				duration: 2,
				opacity: 0.8,
				size: 40,
			},
			push: {
				quantity: 4,
			},
			repulse: {
				distance: 200,
				duration: 0.4,
			},
		},
	},
	particles: {
		color: {
			value: "#ffffff",
		},
		links: {
			color: "#ffffff",
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1,
		},
		collisions: {
			enable: true,
		},
		move: {
			direction: "none",
			enable: true,
			outMode: "bounce",
			random: false,
			speed: 6,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				value_area: 800,
			},
			value: 80,
		},
		opacity: {
			value: 0.5,
		},
		shape: {
			type: "circle",
		},
		size: {
			random: true,
			value: 5,
		},
	},
	detectRetina: true,
}

// saves intial state as a content for when state needs to be reset
const initialState = {
	route: "signIn",
	user: {}
}

class App extends React.Component {

	constructor() {
		super();
		this.state = initialState;
	}

	/*
	description: updates route state and resets state if user logs out.
	input: route name
	output: n/a
	*/
	onRouteChange = (route) => {
		if (route !== "signOut") this.setState({route: route});
		else this.setState(initialState);
	}

	/*
	description: 
	input: 
	output: 
	*/
	updateEntries = (entries) => {
		this.setState(Object.assign(this.state.user, {entries: entries}));
	}

	/*
	description: called by functions in signIn.js and signUp.js and loads user information.
	input: user
	output: n/a
	*/
	loadUser = (user) => {
		this.setState({
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				entries: user.entries,
				joined: user.joined
			}
		});
	}

	/* 
	description: displays different pages based on the route state
	input: n/a
	output: n/a
	*/
	render() {
		// display sign in page
		if (this.state.route === "signIn") {
			return(
				<div>
					<Particles className="fixed" options={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				</div>
			);
		// display sign up page
		} else if (this.state.route === "signUp") {
			return(
				<div>
					<Particles className="fixed" options={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				</div>
			);
		// display home page
		} else if (this.state.route === "home") {
			return (
				<div>
					<Particles className="fixed" options={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<Home user={this.state.user} updateEntries={this.updateEntries}/>
				</div>
			);
		}
	}
}

export default App;
