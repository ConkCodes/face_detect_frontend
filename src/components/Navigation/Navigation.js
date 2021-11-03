import "./Navigation.css";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Navigation = () => {

    return(
        <div className="flex">
            <Tilt className="flex jc-center ai-center h-80 w-80 mtrb-16 ml-32 card">
                <img className="h-80p w-80p" alt="brain" src={brain}/>
            </Tilt>
            <nav className="ml-auto">
                <p className="pr-32 pointer dim underline">Sign Out</p>
            </nav>
        </div>
    );

}

export default Navigation;