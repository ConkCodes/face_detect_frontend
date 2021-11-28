import React from "react";
import Rank from "../../components/Rank/Rank.js";
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm.js"
import FaceRecognition from "../../components/FaceRecognition/FaceRecognition.js";

const initialState = {
	input: "",
	imageUrl: "",
	clarifaiData: {},
	height: 0,
	width: 0,
	box: {}
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

    onEnterPress = (event) => {
        if (event.key === "Enter") this.faceDetect();
    }

	onDetectClick = () => {
		this.faceDetect();
	}

	faceDetect = async () => {
		try {
			const clarifaiRes = await fetch("http://localhost:3000/user/clarifai", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({input: this.state.input})
			});
			const clarifaiStatus = clarifaiRes.status;
			const data = await clarifaiRes.json();
			if (clarifaiStatus !== 200) throw new Error(data);
			const entriesRes = await fetch("http://localhost:3000/user/entries", {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({id: this.props.user.id})
			});
			const entriesStatus = entriesRes.status;
			const entries = await entriesRes.json();
			if (entriesStatus !== 201) throw new Error(entries);
			this.props.updateEntries(entries);
			this.setState({
				imageUrl: this.state.input,
				clarifaiData: data
			});
		} catch (err) {
			alert(err);
			this.setState(initialState);
		}
	}

	onImageLoad = () => {
		const boundingBox = this.state.clarifaiData.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		this.setState({
			width: width,
			height: height,
			box: {
				left: boundingBox.left_col * width, 
				top: boundingBox.top_row * height, 
				right: width - boundingBox.right_col * width, 
				bottom: height - boundingBox.bottom_row * height
			}
		});
	}

    render() {
		if (this.state.imageUrl === "") {
			return (
				<div className="m-auto">
					<Rank user={this.props.user}/>
					<ImageLinkForm onInputChange={this.onInputChange} onEnterPress={this.onEnterPress} onDetectClick={this.onDetectClick}/>
				</div>
			);	
		}
		return (
			<div className="m-auto">
				<Rank user={this.props.user}/>
				<ImageLinkForm onInputChange={this.onInputChange} onEnterPress={this.onEnterPress} onDetectClick={this.onDetectClick}/>
				<FaceRecognition width={this.state.width} height={this.state.height} imageUrl={this.state.imageUrl} onImageLoad={this.onImageLoad} box={this.state.box}/>
			</div>
		);
    }

}

export default Home;