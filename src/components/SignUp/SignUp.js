import "./SignUp.css";

const SignUp = (props) => {

    return(
        <div className="card w-400 plr-80 ptb-48 m-auto mt-32">
            <p className="mt-0 fs-150 b">Sign Up</p>
            <p className="mb-0">Name</p>
            <input type="text" className="input w-max bs-border"/>
            <p className="mb-0">Email</p>
            <input type="text" className="input w-max bs-border"/>
            <p className="mb-0">Password</p>
            <input type="password" className="input w-max bs-border"/>
            <button onClick={() => props.onRouteChange("home")} className="button mt-16">Sign Up</button>
        </div>
    );

}

export default SignUp;