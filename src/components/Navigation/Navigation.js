import "./Navigation.css";
import Link from "../Link/Link.js";

const Navigation = (props) => {

    if (props.route === "signIn") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("signUp")} className="" text="Sign Up"/>
            </nav>
        );
    } else if (props.route === "signUp") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("signIn")} className="" text="Sign In"/>
            </nav>
        );
    } else if (props.route === "home") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("profile")} className="" text="Profile"/>
                <Link onClick={() => props.onRouteChange("signOut")} className="" text="Sign Out"/>
            </nav>
        );
    } else if (props.route === "profile") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("home")} className="" text="Home"/>
                <Link onClick={() => props.onRouteChange("signOut")} className="" text="Sign Out"/>
            </nav>
        );
    }

}

export default Navigation;