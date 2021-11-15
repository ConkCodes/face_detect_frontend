import "./Rank.css";

const Rank = (props) => {

    return(
        <div className="ta-center">
            <p className="c-gradient">{props.name}, your current entry count is...</p>
            <p className="c-gradient">{props.entries}</p>
        </div>
    );

}

export default Rank;