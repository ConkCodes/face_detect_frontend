import React from "react";
import "./Profile.css";
import Form from "../../components/Form/Form.js";
import Link from "../../components/Link/Link.js";
import Input from "../../components/Input/Input.js";

const initialState = {
	profileRoute: "account",
    name: "",
    email: "",
    password: ""
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onProfileRouteChange = (route) => {
        this.setState({profileRoute: route});
    }

    onEnterPress = (event) => {
        if (event.key === "Enter") {
            if (this.state.name !== "") this.updateName();
            if (this.state.email !== "") this.updateEmail();
            if (this.state.password !== "") this.updatePassword();
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    updateName = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/name", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.props.user.id,
                    name: this.state.name
                })
            });
            const status = res.status;
            const name = await res.json();
            if (status !== 200) throw new Error(name);
            this.props.updateName(name);
        } catch (err) {
            alert(err);
        } finally {
            this.setState({name: ""});
            document.getElementById("editNameInput").value = "";
        }
    }

    updateEmail = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/email", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.props.user.id,
                    email: this.state.email
                })
            });
            const status = res.status;
            const email = await res.json();
            if (status !== 200) throw new Error(email);
            this.props.updateEmail(email);
        } catch (err) {
            alert(err);
        } finally {
            this.setState({email: ""});
            document.getElementById("editEmailInput").value = "";
        }
    }

    updatePassword = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/password", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.props.user.id,
                    password: this.state.password
                })
            });
            const status = res.status;
            const password = await res.json();
            if (status !== 200) throw new Error(password);
        } catch (err) {
            alert(err);
        } finally {
            this.setState({password: ""});
            document.getElementById("editPasswordInput").value = "";
        }
    }

    render() {
        if (this.state.profileRoute === "account") {
            return (
                <Form className="form3">
                    <div>
                        <img src="https://i.pinimg.com/originals/d5/92/9f/d5929f157635c606095d49f53fe9776e.png" alt="profile pic" className="profilePic"/>
                        <p>{this.props.user.name}</p>
                        <Link onClick={() => this.onProfileRouteChange("profile")} className="link3" text="Account"/>
                        <Link onClick={() => this.onProfileRouteChange("entries")} className="link4" text="Entries"/>
                    </div>
                    <div className="editProfile">
                        <div className="editProfileLabel">
                            <p>Name</p>
                        </div>
                        <div className="editProfileInput">
                            <Input id="editNameInput" onKeyPress={this.onEnterPress} onChange={this.onNameChange} placeHolder={this.props.user.name} className="input1" readOnly={false}/>
                        </div>
                        <div className="editProfileLabel">
                            <p>Email</p>
                        </div>
                        <div className="editProfileInput">
                            <Input id="editEmailInput" onKeyPress={this.onEnterPress} onChange={this.onEmailChange} placeHolder={this.props.user.email} className="input1" readOnly={false}/>
                        </div>
                        <div className="editProfileLabel">
                            <p>Password</p>
                        </div>
                        <div className="editProfileInput">
                            <Input id="editPasswordInput" onKeyPress={this.onEnterPress} onChange={this.onPasswordChange} placeHolder={"**********"} type="password" className="input1" readOnly={false}/>
                        </div>
                        <div className="editProfileLabel">
                            <p>Joined</p>
                        </div>
                        <div className="editProfileInput">
                            <Input placeHolder={this.props.user.joined} className="input1" readOnly={true}/>
                        </div>
                    </div>
                </Form>
            );
        } else if (this.state.profileRoute === "entries") {
            // grab entries as an array and map them into something and display them like on
            return (
                <Form className="form3">
                    <div>
                        <img src="https://i.pinimg.com/originals/d5/92/9f/d5929f157635c606095d49f53fe9776e.png" alt="profile pic" className="profilePic"/>
                        <p>{this.props.user.name}</p>
                        <Link onClick={() => this.onProfileRouteChange("account")} className="link4" text="Account"/>
                        <Link onClick={() => this.onProfileRouteChange("entries")} className="link3" text="Entries"/>
                    </div>
                    <p>entries here</p>
                </Form>
            );
        }


    }

}

export default Profile;