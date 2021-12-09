import "./Navigation.css";
import Link from "../Link/Link.js";

const Navigation = (props) => {

    if (props.route === "signIn") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("signIn")} className="navLink1" text="Sign In"/>
                <Link onClick={() => props.onRouteChange("signUp")} className="navLink2" text="Sign Up"/>
            </nav>
        );
    } else if (props.route === "signUp") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("signIn")} className="navLink2" text="Sign In"/>
                <Link onClick={() => props.onRouteChange("signUp")} className="navLink1" text="Sign Up"/>
            </nav>
        );
    } else if (props.route === "home") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("home")} className="navLink1" text="Home"/>
                <Link onClick={() => props.onRouteChange("profile")} className="navLink2" text="Profile"/>
                <Link onClick={() => props.onRouteChange("signOut")} className="navLink2" text="Sign Out"/>
            </nav>
        );
    } else if (props.route === "profile") {
        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("home")} className="navLink2" text="Home"/>
                <Link onClick={() => props.onRouteChange("profile")} className="navLink1" text="Profile"/>
                <Link onClick={() => props.onRouteChange("signOut")} className="navLink2" text="Sign Out"/>
            </nav>
        );
    }

}

export default Navigation;