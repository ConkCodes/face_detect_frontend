import "./Link.css";

const Link = (props) => {

    return (
        <p onClick={props.onClick} className={"link " + props.className}>{props.text}</p>
    );

}

export default Link