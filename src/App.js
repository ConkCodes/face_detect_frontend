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
	apiKey: "Your API Key Here"
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
			clarifaiData: {},
			box: {},
			route: "signIn"
		}
	}

	/*
	description: listens to the onChange event in ImageLinkForm.js and sets the input value to input state.
	input: onClick event
	output: n/a
	*/
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	/*
	description: listens to the onClick event in ImageLinkForm.js and on click sends the image url to the clarifai api.if valid image url, imageUrl state is updated causing 
		the image to be displayed and then when the image loads, the onLoad event handler calculates the face box. otherwise, the imageUrl is reset and no image is displayed.
	input: n/a
	output: n/a
	*/
	onButtonSubmit = () => {
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then(data => {
			// if valid url set imageUrl to input and response to clarifaiData
			this.setState({
				imageUrl: this.state.input,
				clarifaiData: data
			});
		})
		.catch(error => {
			// if invalid erase previous imageUrl and clarifaiData which removes previous image from display
			// only need to check if imageUrl is empty since imageUrl and clarifaiData are set in sync
			if (this.state.imageUrl !== "") {
				this.setState({
					imageUrl: "",
					clarifaiData: {}
				});
			}
			console.log(error);
		});
	}

	/*
	description: uses the clarifai api response to calculate the bounding box around faces and sets it to the box state.
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
	description: listens fror onClick events for when the user is trying to change pages and receives the destination route name. the input and imageUrl state must be reset when
		the page is switched. otherwise if the user signs out and signs back in, the previous image will still be displayed.
	input: the route name the user is trying to reach
	output: n/a
	*/
	onRouteChange = (route) => {
		this.setState({route: route});
		// if page is changed reset input state
		if (this.state.input !== "") {
			this.setState({input: ""});
		}
		// if page is changed reset imageUrl state
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
					<FaceRecognition imageUrl={this.state.imageUrl} onImageLoad={this.onImageLoad} box={this.state.box}/>
				</div>
			);
		}
	}

}

export default App;
