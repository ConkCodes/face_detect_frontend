// import react?
// import profile.css?

const Profile = (props) => {

    return (
        <div>
            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
            <p>{props.user.entries}</p>
            <p>{props.user.joined}</p>
        </div>
    );

}

export default Profile;