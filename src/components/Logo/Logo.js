import "./Logo.css";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {

    return(
        <Tilt className="flex jc-center ai-center h-160 w-160 m-32 b-gradient b-black">
            <img className="h-80p w-80p" alt="brain" src={brain}/>
        </Tilt>
    );

}

export default Logo;