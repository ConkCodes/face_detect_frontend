import "./Rank.css";

const Rank = (props) => {

    return(
        <div className="ta-center">
            <p className="c-gradient b mt-32 mb-0">{props.name}, Your Current Entry Count Is...</p>
            <p className="c-gradient b mt-0 mb-0">{props.entries}</p>
        </div>
    );

}

export default Rank;