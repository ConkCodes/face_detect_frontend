import "./Rank.css";

const Rank = (props) => {

    return(
        <div className="ta-center">
            <p>{props.user.name}, your current entry count is...</p>
            <p>{props.user.entries}</p>
        </div>
    );

}

export default Rank;