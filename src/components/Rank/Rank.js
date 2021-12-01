import "./Rank.css";
import Text from "../Text/Text.js";

const Rank = (props) => {

    return (
        <div className="ta-center">
            <Text text={props.user.name + ", Your Current Entry Count Is..."} className="text2"/>
            <Text text={props.user.entries} className="text3"/>
        </div>
    );

}

export default Rank;