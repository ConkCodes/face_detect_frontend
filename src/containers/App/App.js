import React from "react";
import './App.css';
import Particles from "react-tsparticles";
import Header from "../../components/Header/Header.js";
import SignIn from "../SignIn/SignIn.js";
import SignUp from "../SignUp/SignUp.js";
import Home from "../Home/Home.js";
import Profile from "../Profile/Profile.js";
import Footer from "../../components/Footer/Footer.js";

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

const initialState = {
	route: "signIn",
	user: {}
}

class App extends React.Component {

	constructor() {
		super();
		this.state = initialState;
	}

	onRouteChange = (route) => {
		if (route !== "signOut") this.setState({route: route});
		else this.setState(initialState);
	}

	updateName = (name) => {
		this.setState(Object.assign(this.state.user, {name: name}));
	}

	updateEmail = (email) => {
		this.setState(Object.assign(this.state.user, {email: email}));
	}

	updateUser = (entries) => {
		this.setState(Object.assign(this.state.user, {entries: entries}));
	}

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

	render() {

		let content;
		if (this.state.route === "signIn") content = <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		else if (this.state.route === "signUp") content = <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		else if (this.state.route === "home") content = <Home user={this.state.user} updateEntries={this.updateEntries}/>
		else if (this.state.route === "profile") content = <Profile user={this.state.user} updateName={this.updateName} updateEmail={this.updateEmail}/>

		return(
			<div className="flex column">
				<Particles className="paticles" options={particlesOptions}/>
				<Header route={this.state.route} onRouteChange={this.onRouteChange}/>
				{content}
				<Footer/>
			</div>
		);

	}
	
}

export default App;
