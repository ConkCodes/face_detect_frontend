import "./Navigation.css";
import Logo from "../Logo/Logo.js";

const Navigation = (props) => {

    if (props.route === "signIn") {
        return (
            <div className="flex">
                <Logo/>
                <nav className="ml-auto flex">
                    <p onClick={() => props.onRouteChange("signUp")} className="pr-32 m-auto link c-white fs-125">Sign Up</p>
                </nav>
            </div>
        );
    } else if (props.route === "signUp") {
        return (
            <div className="flex">
                <Logo/>
                <nav className="ml-auto flex">
                    <p onClick={() => props.onRouteChange("signIn")} className="pr-32 m-auto link c-white fs-125">Sign In</p>
                </nav>
            </div>
        );
    } else if (props.route === "home") {
        return (
            <div className="flex">
                <Logo/>
                <nav className="ml-auto flex">
                    <p onClick={() => props.onRouteChange("profile")} className="pr-32 m-auto link c-white fs-125">Profile</p>
                    <p onClick={() => props.onRouteChange("signOut")} className="pr-32 m-auto link c-white fs-125">Sign Out</p>
                </nav>
            </div>
        );
    } else if (props.route === "profile") {
        return (
            <div className="flex">
                <Logo/>
                <nav className="ml-auto flex">
                    <p onClick={() => props.onRouteChange("home")} className="pr-32 m-auto link c-white fs-125">Home</p>
                    <p onClick={() => props.onRouteChange("signOut")} className="pr-32 m-auto link c-white fs-125">Sign Out</p>
                </nav>
            </div>
        );
    }

}

export default Navigation;