import "./ImageLinkForm.css";
import Input from "../../components/Input/Input.js";

const ImageLinkForm = (props) => {

    return (
        <div className="flex fd-column ai-center">
            <p className="mb-0 c-gradient b fs-150">Enter an Image Link for the Magic Brain to Detect Human Faces</p>
            <div className="w-512 flex p-16 m-16 card">
                <Input id="urlInput" className="w-70p bs-border" onKeyPress={props.onEnterPress} onChange={props.onInputChange} type={"text"}/>
                
                <div className="idk"></div>
                <button onClick={props.onDetectClick} className="w-28p button">Detect</button>
            </div>
        </div>
    );

}

export default ImageLinkForm;