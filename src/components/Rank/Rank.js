import "./Rank.css";

const Rank = (props) => {

    return (
        <div className="ta-center">
            <p className="c-gradient b fs-150 mt-32 mb-0">{props.user.name}, Your Current Entry Count Is...</p>
            <p className="c-gradient b fs-200 mt-0 mb-0">{props.user.entries}</p>
        </div>
    );

}

export default Rank;