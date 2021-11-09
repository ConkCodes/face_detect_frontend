import "./Rank.css";

const Rank = (props) => {

    return(
        <div className="ta-center">
            <p>{props.name}, your current entry count is...</p>
            <p>{props.entries}</p>
        </div>
    );

}

export default Rank;