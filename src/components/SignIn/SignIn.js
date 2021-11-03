import "./SignIn.css";

const SignIn = (props) => {

    return(
        <div className="card w-400 plr-80 ptb-48 m-auto mt-32">
            <p className="mt-0 fs-150 b">Sign In</p>
            <p className="mb-0">Email</p>
            <input type="text" className="input w-max bs-border"/>
            <p className="mb-0">Password</p>
            <input type="password" className="input w-max bs-border"/>
            <button onClick={() => props.onRouteChange("home")} className="button mt-16">Sign In</button>
            <p className="mb-0">Don't have an account? <span>Sign up</span></p>
        </div>
    );

}

export default SignIn;