import "./Logo.css";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {

    return (
        <Tilt className="logo card">
            <img className="h-80p w-80p" alt="brain" src={brain}/>
        </Tilt>
    );

}

export default Logo;