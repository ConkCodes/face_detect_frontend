import React from "react";
import './App.css';
import Clarifai from "clarifai";
import Particles from "react-tsparticles";
import Navigation from "./components/Navigation/Navigation.js";
import SignIn from "./components/SignIn/SignIn.js";
import SignUp from "./components/SignUp/SignUp.js"
import Rank from "./components/Rank/Rank.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";

// create clarifai object using api key
const app = new Clarifai.App({
	apiKey: "you api key here"
});

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

const initialState = {
	input: "",
	imageUrl: "",
	clarifaiData: {},
	box: {},
	route: "signIn",
	user: {}
}

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			input: "",
			imageUrl: "",
			clarifaiData: {},
			box: {},
			route: "signIn",
			user: {}
		}
	}

	/*
	description: listens to the onChange event in ImageLinkForm.js and sets the input value to input state.
	input: onChange event
	output: n/a
	*/
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	/*
	description: 
		listens to the onClick event in ImageLinkForm.js and on click sends the image url to the clarifai api.
		if image url is valid, imageUrl state is updated causing the image to be displayed and the user's entries count is updated. 
		if image url is invalid, the imageUrl is reset and no new image is displayed or the previous image is removed.
	input: n/a
	output: n/a
	*/
	onDetectClick = async () => {
		try {
			const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);
			this.setState({
				imageUrl: this.state.input,
				clarifaiData: data
			});
			const res = await fetch("http://localhost:3000/user/entries", {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({id: this.state.user.id})
			});
			const entries = await res.json();
			if (entries === "user does not exist") console.log(entries);
			else this.setState(Object.assign(this.state.user, {entries: entries}));
		} catch (err) {
			if (this.state.imageUrl !== "") {
				this.setState({
					imageUrl: "",
					clarifaiData: {}
				});
			}
			console.log(err);
		}
	}

	/*
	description: 
		uses the clarifai api response to calculate the bounding box around faces and sets it to the box state.
		must wait for image to load to ensure proper width and height attributes are used.
	input: clarifai api response
	output: n/a
	*/
	onImageLoad = () => {
		const boundingBox = this.state.clarifaiData.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		this.setState({
			box: {
				left: boundingBox.left_col * width, 
				top: boundingBox.top_row * height, 
				right: width - boundingBox.right_col * width, 
				bottom: height - boundingBox.bottom_row * height
			}
		});
	}

	/*
	description: 
		listens for onClick events for when the user is trying to change pages and receives the destination route name. 
		the state must be reset if user signs out.
		otherwise if the user signs out and signs back in, the previous image will still be displayed.
	input: the route name the user is trying to reach
	output: n/a
	*/
	onRouteChange = (route) => {
		this.setState({route: route});
		if (route === "signOut") this.setState(initialState);
	}

	/*
	description: called by functions in signIn.js and signUp.js and loads user information.
	input: user n/a
	output: 
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
		if (this.state.route === "signIn" || this.state.route === "signOut") {
			return(
				<div>
					<Particles className="fixed" options={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				</div>
			);
		} else if (this.state.route === "signUp") {
			return(
				<div>
					<Particles className="fixed" options={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				</div>
			);	
		} else if (this.state.route === "home") {
			return (
				<div>
					<Particles className="fixed" options={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<Rank name={this.state.user.name} entries={this.state.user.entries}/>
					<ImageLinkForm onInputChange={this.onInputChange} onDetectClick={this.onDetectClick}/>
					<FaceRecognition imageUrl={this.state.imageUrl} onImageLoad={this.onImageLoad} box={this.state.box}/>
				</div>
			);
		}
	}

}

export default App;
