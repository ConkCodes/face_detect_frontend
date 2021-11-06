import "./FaceRecognition.css";

const FaceRecognition = (props) => {

    // invalid imageUrl - display nothing
    if (props.imageUrl === "") {
        return(
            <div></div>
        ); 
    // valid imageUrl - display image and face box if found
    } else {
        return(
            <div className="flex jc-center">
                <div className="abs">
                    <img onLoad={props.onImageLoad} id="inputImage" className="w-512 h-auto b-black shadow" alt="" src={props.imageUrl}/>
                    <div className="bounding-box" style={{top: props.box.top, right: props.box.right, bottom: props.box.bottom, left: props.box.left}}></div>
                </div>
            </div>
        );
    }

}

export default FaceRecognition;