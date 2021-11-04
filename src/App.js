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

const app = new Clarifai.App({
	apiKey: "Your API Key Here"
});

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

	displayFaceBox = (box) => {
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then(data => {
			this.setState({imageUrl: this.state.input});
			this.generateFaceBox(data);
		})
		.catch(error => {
			this.setState({imageUrl: ""});
			console.log(error);
		});
	}

	onRouteChange = (route) => {
		this.setState({route: route});
		if (this.state.input !== "") {
			this.setState({input: ""});
		}
		if (this.state.imageUrl !== "") {
			this.setState({imageUrl: ""});
		}
	}

	render() {
		if (this.state.route === "signIn") {
			return(
				<div>
					<Particles className="fixed" params={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignIn onRouteChange={this.onRouteChange}/>
				</div>
			);
		} else if (this.state.route === "signUp") {
			return(
				<div>
					<Particles className="fixed" params={particlesOptions}/>
					<Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
					<SignUp onRouteChange={this.onRouteChange}/>
				</div>
			);	
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
