import React from "react";
import "./ImageLinkForm.css";

class ImageLinkForm extends React.Component {

    /*
    description: sets focus to first input on page load.
    input: n/a
    output: n/a
    */
    componentDidMount() {
        document.getElementById("detectInput").focus();
    }

    render() {
        return(
            <div className="flex fd-column ai-center">
                <p className="mb-0 c-gradient b fs-150">Enter an Image Link for the Magic Brain to Detect Human Faces</p>
                <div className="w-512 flex p-16 m-16 card">
                    <input id="detectInput" onChange={this.props.onInputChange} type="text" className="w-70p input"/>
                    <button onClick={this.props.onDetectClick} className="w-30p button">Detect</button>
                </div>
            </div>
        );
    }

}

export default ImageLinkForm;