import "./Navigation.css";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Navigation = (props) => {

    if (props.route === "signIn") {
        return(
            <div className="flex">
                <Tilt className="flex jc-center ai-center h-80 w-80 mtrb-16 ml-32 card">
                    <img className="h-80p w-80p" alt="brain" src={brain}/>
                </Tilt>
                <nav className="ml-auto">
                    <p onClick={() => props.onRouteChange("signUp")} className="pr-32 link">Sign Up</p>
                </nav>
            </div>
        );
    } else if (props.route === "signUp") {
        return(
            <div className="flex">
                <Tilt className="flex jc-center ai-center h-80 w-80 mtrb-16 ml-32 card">
                    <img className="h-80p w-80p" alt="brain" src={brain}/>
                </Tilt>
                <nav className="ml-auto">
                    <p onClick={() => props.onRouteChange("signIn")} className="pr-32 link">Sign In</p>
                </nav>
            </div>
        );
    } else {
        return(
            <div className="flex">
                <Tilt className="flex jc-center ai-center h-80 w-80 mtrb-16 ml-32 card">
                    <img className="h-80p w-80p" alt="brain" src={brain}/>
                </Tilt>
                <nav className="ml-auto">
                    <p onClick={() => props.onRouteChange("signIn")} className="pr-32 link">Sign Out</p>
                </nav>
            </div>
        );

    }



}

export default Navigation;