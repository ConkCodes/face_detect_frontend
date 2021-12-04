import "./Navigation.css";
import Link from "../Link/Link.js";

const Navigation = (props) => {

    if (props.route === "signIn") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("signUp")} className="link1" text="Sign Up"/>
            </nav>
        );
    } else if (props.route === "signUp") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("signIn")} className="link1" text="Sign In"/>
            </nav>
        );
    } else if (props.route === "home") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("profile")} className="link1" text="Profile"/>
                <Link onClick={() => props.onRouteChange("signOut")} className="link1" text="Sign Out"/>
            </nav>
        );
    } else if (props.route === "profile") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("home")} className="link1" text="Home"/>
                <Link onClick={() => props.onRouteChange("signOut")} className="link1" text="Sign Out"/>
            </nav>
        );
    }

}

export default Navigation;