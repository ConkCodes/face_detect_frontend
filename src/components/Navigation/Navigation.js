import "./Navigation.css";
import Link from "../Link/Link.js";

const Navigation = (props) => {

    let classes;

    if (props.route === "signIn" || props.route === "signUp") {

        if (props.route === "signIn") classes = ["navLink1", "navLink2"];
        else if (props.route === "signUp") classes = ["navLink2", "navLink1"];

        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("signIn")} className={classes[0]} text="Sign In"/>
                <Link onClick={() => props.onRouteChange("signUp")} className={classes[1]} text="Sign Up"/>
            </nav>
        );

    } else {

        if (props.route === "home") classes = ["navLink1", "navLink2", "navLink2"];
        else if (props.route === "profile") classes = ["navLink2", "navLink1", "navLink2"];

        return (
            <nav className="nav">
                <Link onClick={() => props.onRouteChange("home")} className={classes[0]} text="Home"/>
                <Link onClick={() => props.onRouteChange("profile")} className={classes[1]} text="Profile"/>
                <Link onClick={() => props.onRouteChange("signOut")} className={classes[2]} text="Sign Out"/>
            </nav>
        );

    }

}

export default Navigation;