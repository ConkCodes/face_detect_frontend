import "./FaceRecognition.css";

const FaceRecognition = (props) => {

    if (props.imageUrl === "") {
        return(
            <div></div>
        ); 
    } else {
        return(
            <div className="flex jc-center">
                <div className="abs">
                    <img id="inputImage" className="w-512 h-auto b-black shadow" alt="" src={props.imageUrl}/>
                    <div className="bounding-box" style={{top: props.box.top, right: props.box.right, bottom: props.box.bottom, left: props.box.left}}></div>
                </div>
            </div>
        );
    }

}

export default FaceRecognition;