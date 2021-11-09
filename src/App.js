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
			const res = await fetch("http://localhost:3000/entries", {
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
		the input and imageUrl state must be reset when the page is switched. 
		otherwise if the user signs out and signs back in, the previous image will still be displayed.
	input: the route name the user is trying to reach
	output: n/a
	*/
	onRouteChange = (route) => {
		this.setState({route: route});
		if (this.state.input !== "") this.setState({input: ""});
		if (this.state.imageUrl !== "") this.setState({imageUrl: ""});
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
		if (this.state.route === "signIn") {
			return(
				<div>
					<Particles className="fixed" params={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				</div>
			);
		} else if (this.state.route === "signUp") {
			return(
				<div>
					<Particles className="fixed" params={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				</div>
			);	
		} else {
			return (
				<div>
					<Particles className="fixed" params={particlesOptions}/>
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
