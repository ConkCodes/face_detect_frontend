import "./ImageLinkForm.css";
import Text from "../Text/Text.js";
import Form from "../Form/Form.js";
import Input from "../Input/Input.js";
import Button from "../Button/Button.js";

const ImageLinkForm = (props) => {

    return (
        <div>
            <Text text="Enter an Image Link for the Magic Brain to Detect Human Faces" className="text1"/>
            <Form className="imageForm">
                <Input id="urlInput" onKeyPress={props.onEnterPress} onChange={props.onInputChange} type={"text"} className="imageInput"/>
                <div className="space"></div>
                <Button onClick={props.onDetectClick} text="Detect" className="detectButton"/>
            </Form>
        </div>
    );

}

export default ImageLinkForm;