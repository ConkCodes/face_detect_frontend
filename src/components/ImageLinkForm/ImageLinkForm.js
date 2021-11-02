import "./ImageLinkForm.css";

const ImageLinkForm = () => {

    return(
        <div className="flex fd-column ai-center">
            <p>Enter an Image Link for the Magic Brain to Detect Human Faces</p>
            <div className="w-512 flex p-16 m-16 card">
                <input className="w-70p input"/>
                <button className="w-30p button">Detect</button>
            </div>
        </div>
    );

}

export default ImageLinkForm;