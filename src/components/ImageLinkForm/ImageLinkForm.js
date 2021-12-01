import "./ImageLinkForm.css";
import Form from "../../components/Form/Form.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";

const ImageLinkForm = (props) => {

    return (
        <div>
            <p className="mb-16 c-gradient b fs-150">Enter an Image Link for the Magic Brain to Detect Human Faces</p>
            <Form className="form2">
                <Input id="urlInput" className="w-70p bs-border" onKeyPress={props.onEnterPress} onChange={props.onInputChange} type={"text"}/>
                <div className="idk"></div>
                <Button onClick={props.onDetectClick} text="Detect" className="w-28p"/>
            </Form>
        </div>
    );

}

export default ImageLinkForm;