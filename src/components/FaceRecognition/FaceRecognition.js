import "./FaceRecognition.css";

const FaceRecognition = (props) => {

    return (
        <div style={{width: props.width, height: props.height}} className="m-auto">
            <div className="abs">
                <img onLoad={props.onImageLoad} id="inputImage" className="image" alt="" src={props.imageUrl}/>
                <div className="bounding-box" style={{top: props.box.top, right: props.box.right, bottom: props.box.bottom, left: props.box.left}}></div>
            </div>
        </div>
    );

}

export default FaceRecognition;