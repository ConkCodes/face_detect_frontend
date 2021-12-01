import "./Header.css";
import Logo from "../Logo/Logo.js";
import Navigation from "../Navigation/Navigation.js";

const Header = (props) => {

    return (
        <header className="header">
            <Logo/>
            <Navigation route={props.route} onRouteChange={props.onRouteChange}/>
        </header>
    );

}

export default Header;