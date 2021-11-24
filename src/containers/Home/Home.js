import React from "react";
import Rank from "../../components/Rank/Rank.js";
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm.js"
import FaceRecognition from "../../components/FaceRecognition/FaceRecognition.js";

const initialState = {
	input: "",
	imageUrl: "",
	clarifaiData: {},
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

	getFaceBox = async () => {
		try {

		} catch (err) {

		}
	}

	faceDetect = async () => {
		try {
			let res = await fetch("http://localhost:3000/user/clarifai", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({input: this.state.input})
			});
			const data = await res.json();
			if (res.status !== 200) throw new Error(data);
			res = await fetch("http://localhost:3000/user/entries", {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({id: this.props.user.id})
			});
			const entries = await res.json();
			if (res.status !== 201) throw new Error(entries);
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