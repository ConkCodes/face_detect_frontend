import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {

    return(
        <div className="flex fd-column ai-center">
            <p className="mb-0">Enter an Image Link for the Magic Brain to Detect Human Faces</p>
            <div className="w-512 flex p-16 m-16 card">
                <input onChange={props.onInputChange} type="text" className="w-70p input"/>
                <button onClick={props.onDetectClick} className="w-30p button">Detect</button>
            </div>
        </div>
    );

}

export default ImageLinkForm;