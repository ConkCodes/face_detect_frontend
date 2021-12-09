import React from "react";
import "./Profile.css";
import Form from "../../components/Form/Form.js";
import ProfileNav from "../../components/ProfileNav/ProfileNav.js";
import Account from "../../components/Account/Account.js";

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

    onSaveClick = () => {
        if (this.state.name !== "") this.updateName();
        if (this.state.email !== "") this.updateEmail();
        if (this.state.password !== "") this.updatePassword();
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

        let content;
        if (this.state.profileRoute === "account") content = <Account onEnterPress={this.onEnterPress} user={this.props.user} onNameChange={this.onNameChange} onEmailChange={this.onEmailChange} onPasswordChange={this.onPasswordChange} onSaveClick={this.onSaveClick}/>
        // grab entries as an array and map them into something and display them like on
        else if (this.state.profileRoute === "entries") content = <p>entries here</p>

        return (
            <Form className="profileForm">
                <ProfileNav user={this.props.user} profileRoute={this.state.profileRoute} onProfileRouteChange={this.onProfileRouteChange}/>
                {content}
            </Form>
        );

    }

}

export default Profile;