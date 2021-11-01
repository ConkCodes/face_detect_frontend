import "./Logo.css";
import Tilt from "react-parallax-tilt";

const Logo = () => {

    return(
        <Tilt className="h-160 w-160 b-gradient b-black">
            <div>
                <h1>React Parallax Tilt 👀</h1>
            </div>
        </Tilt>
    );

}

export default Logo;