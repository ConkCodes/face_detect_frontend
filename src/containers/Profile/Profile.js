import React from "react";
import "./Profile.css";
import Form from "../../components/Form/Form.js";
import Link from "../../components/Link/Link.js";
import Input from "../../components/Input/Input.js";

const initialState = {
	profileRoute: "profile"
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onProfileRouteChange = (route) => {
        this.setState({profileRoute: route});
    }

    render() {

        if (this.state.profileRoute === "profile") {
            return (
                <Form className="form3">
                    <div>
                        <img src="https://i.pinimg.com/originals/d5/92/9f/d5929f157635c606095d49f53fe9776e.png" alt="profile pic" className="profilePic"/>
                        <p>{this.props.user.name}</p>
                        <Link onClick={() => this.onProfileRouteChange("profile")} className="link3" text="Profile"/>
                        <Link onClick={() => this.onProfileRouteChange("entries")} className="link3" text="Entries"/>
                    </div>
                    {// how to make all the inputs go to the end equally? use css grid to make another column OR find out how to stretch inputs to remining % maybe 100% works?
                    }
                    <div className="editProfile">
                        <div className="editProfileLabel">
                            <p>Name</p>
                        </div>
                        <div className="editProfileInput">
                            <Input placeHolder={this.props.user.name} className="input1" readOnly={false}/>
                        </div>
                        <div className="editProfileLabel">
                            <p>Email</p>
                        </div>
                        <div className="editProfileInput">
                            <Input placeHolder={this.props.user.email} className="input1" readOnly={false}/>
                        </div>
                        <div className="editProfileLabel">
                            <p>Password</p>
                        </div>
                        <div className="editProfileInput">
                            <Input placeHolder={"**********"} className="input1" readOnly={false}/>
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
                        <p>profile pic</p>
                        <p>name</p>
                        <Link onClick={() => this.onProfileRouteChange("profile")} className="" text="Profile"/>
                        <Link onClick={() => this.onProfileRouteChange("entries")} className="" text="Entries"/>
                    </div>
                    <p>entries here</p>
                </Form>
            );
        }


    }

}

export default Profile;