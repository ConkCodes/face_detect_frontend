import "./Text.css";

const Text = (props) => {

    return (
        <p className={"text " + props.className}>{props.text}</p>
    );

}

export default Text;