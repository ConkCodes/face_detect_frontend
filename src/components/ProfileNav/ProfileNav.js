import "./ProfileNav.css";
import Link from "../../components/Link/Link.js";

const ProfileNav = (props) => {

    let classes;
    if (props.profileRoute === "account") classes = ["profileLink1", "profileLink2"]
    else if (props.profileRoute === "entries") classes = ["profileLink2", "profileLink1"]

    return (
        <div>
            <img src="https://i.pinimg.com/originals/d5/92/9f/d5929f157635c606095d49f53fe9776e.png" alt="profile pic" className="profilePic"/>
            <p>{props.user.name}</p>
            <Link onClick={() => props.onProfileRouteChange("account")} className={classes[0]} text="Account"/>
            <Link onClick={() => props.onProfileRouteChange("entries")} className={classes[1]} text="Entries"/>
        </div>
    );

}

export default ProfileNav;