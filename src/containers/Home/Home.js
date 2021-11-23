import React from "react";
import Clarifai from "clarifai";
import Rank from "../../components/Rank/Rank.js";
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm.js"
import FaceRecognition from "../../components/FaceRecognition/FaceRecognition.js";

// create clarifai object using api key
const app = new Clarifai.App({apiKey: process.env.REACT_APP_KEY});

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
			imageUrl: "",
			clarifaiData: {},
			box: {}
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
				body: JSON.stringify({id: this.props.user.id})
			});
			const entries = await res.json();
			if (entries !== "user does not exist") this.props.updateEntries(entries);
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

    render() {
        return (
            <div>
                <Rank user={this.props.user}/>
                <ImageLinkForm onInputChange={this.onInputChange} onEnterPress={this.onEnterPress} onDetectClick={this.onDetectClick}/>
                <FaceRecognition imageUrl={this.state.imageUrl} onImageLoad={this.onImageLoad} box={this.state.box}/>
            </div>
        );
    }

}

export default Home;