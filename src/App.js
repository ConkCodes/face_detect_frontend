import React from "react";
import './App.css';
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation.js";
import SignIn from "./components/SignIn/SignIn.js";
import SignUp from "./components/SignUp/SignUp.js"
import Rank from "./components/Rank/Rank.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";

// create clarifai object using api key
const app = new Clarifai.App({
	apiKey: "c90f97e9f7684d219fa18723f497149a"
});

// customize particles.js
const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 300
			}
		}
	}
}

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			input: "",
			imageUrl: "",
			box: {},
			route: "signIn"
		}
	}

	// use clarifai response to create bounding box
	generateFaceBox = (data) => {
		const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = image.width;
		const height = image.height;
		this.setState({
			box: {
				left: boundingBox.left_col * width,
				top: boundingBox.top_row * height,
				right: width - boundingBox.right_col * width,
				bottom: height - boundingBox.bottom_row * height
			}
		});
	}

	// listens to for imageUrl
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	// listens to user submitting imageUrl
	onButtonSubmit = () => {
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then(data => {
			// if valid url set imageUrl to input
			this.setState({imageUrl: this.state.input});
			this.generateFaceBox(data);
		})
		.catch(error => {
			// if invalid do not set / erase previous imageUrl
			this.setState({imageUrl: ""});
			console.log(error);
		});
	}

	// listens for user page changes
	onRouteChange = (route) => {
		this.setState({route: route});
		// if page is changed reset input state
		if (this.state.input !== "") {
			this.setState({input: ""});
		}
		// if page is changed reset input state
		if (this.state.imageUrl !== "") {
			this.setState({imageUrl: ""});
		}
	}

	render() {
		// display sign in page
		if (this.state.route === "signIn") {
			return(
				<div>
					<Particles className="fixed" params={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignIn onRouteChange={this.onRouteChange}/>
				</div>
			);
		// display sign up page
		} else if (this.state.route === "signUp") {
			return(
				<div>
					<Particles className="fixed" params={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignUp onRouteChange={this.onRouteChange}/>
				</div>
			);	
		// display home page
		} else {
			return (
				<div>
					<Particles className="fixed" params={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<Rank/>
					<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
					<FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
				</div>
			);
		}
	}

}

export default App;
