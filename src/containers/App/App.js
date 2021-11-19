import React from "react";
import './App.css';
import Clarifai from "clarifai";
import Particles from "react-tsparticles";
import Navigation from "../../components/Navigation/Navigation.js";
import SignIn from "../../components/SignIn/SignIn.js";
import SignUp from "../../components/SignUp/SignUp.js"
import Rank from "../../components/Rank/Rank.js";
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm.js"
import FaceRecognition from "../../components/FaceRecognition/FaceRecognition.js";

// create clarifai object using api key
const app = new Clarifai.App({apiKey: process.env.REACT_APP_KEY});

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
		this.state = initialState;
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
	description: listens to the onKeyPress event and calls faceDetect() when the enter key is pressed.
	input: onKeyPress event
	output: n/a
	*/
    onEnterPress = (event) => {
        if (event.key === "Enter") this.faceDetect();
    }

	/*
	description: listens to the onClick event in ImageLinkForm.js and calls faceDetect().
	input: n/a
	output: n/a
	*/
	onDetectClick = () => {
		this.faceDetect();
	}

	/*
	description: displays image, get face box data, and updates user entry count.
	input: n/a
	output: n/a
	*/
	faceDetect = async () => {
		try {
			// call clarifai face detect api with image url
			const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);
			// update user entries count
			const res = await fetch("http://localhost:3000/user/entries", {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({id: this.state.user.id})
			});
			const entries = await res.json();
			if (entries !== "user does not exist") this.setState(Object.assign(this.state.user, {entries: entries}));
			// could not find user
			else throw new Error(entries);
			// if image url is valid and user entries is successfully updated -> update image url state to display image and update clarifai data to calculate face box
			this.setState({
				imageUrl: this.state.input,
				clarifaiData: data
			});
		// error
		} catch (err) {
			// log error
			console.log(err);
			// reset state if api or database fails
			if (this.state.imageUrl !== "") {
				this.setState({
					imageUrl: "",
					clarifaiData: {}
				});
			}
		}
	}

	/*
	description: waits for image load to use width, height, and clarifai data to calculate and display the face box.
	input: clarifai api response
	output: n/a
	*/
	onImageLoad = () => {
		const boundingBox = this.state.clarifaiData.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		// calculations
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
	description: updates route state and resets state if user logs out.
	input: route name
	output: n/a
	*/
	onRouteChange = (route) => {
		if (route !== "signOut") this.setState({route: route});
		else this.setState(initialState);
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
					<Rank name={this.state.user.name} entries={this.state.user.entries}/>
					<ImageLinkForm onInputChange={this.onInputChange} onEnterPress={this.onEnterPress} onDetectClick={this.onDetectClick}/>
					<FaceRecognition imageUrl={this.state.imageUrl} onImageLoad={this.onImageLoad} box={this.state.box}/>
				</div>
			);
		}
	}
}

export default App;
