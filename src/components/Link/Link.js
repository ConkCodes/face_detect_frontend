import "./Link.css";

const Link = (props) => {

    if (props.span === undefined) {
        return (
            <p onClick={props.onClick} className={"link " + props.className}>{props.text}</p>
        );
    } else {
        return (
            <span onClick={props.onclick} className={"link " + props.className}>{props.text}</span>
        );
    }

}

export default Link