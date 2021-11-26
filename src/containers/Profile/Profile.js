// import react?
import "./Profile.css";

const Profile = (props) => {

    return (
        <div className="flex jc-center ai-center h-max">
            <div className="card w-800">
                <p>{props.user.name}</p>
                <p>{props.user.email}</p>
                <p>{props.user.entries}</p>
                <p>{props.user.joined}</p>
            </div>
        </div>

    );

}

export default Profile;