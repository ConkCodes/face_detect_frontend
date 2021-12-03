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

    }

    render() {

        return (
            <Form className="form3">
                <div>
                    <p>profile pic</p>
                    <p>name</p>
                    <Link onClick={() => this.onProfileRouteChange("profile")} className="" text="Profile"/>
                    <Link onClick={() => this.onProfileRouteChange("entries")} className="" text="Entries"/>
                </div>
                <div>
                    <div className="flex">
                        <p>name</p>
                        <p>{this.props.user.name}</p>
                        <Input/>
                    </div>
                    <div className="flex">
                        <p>email</p>
                        <p>{this.props.user.email}</p>
                        <Input/>
                    </div>
                    <div className="flex">
                        <p>password</p>
                        <p>*****</p>
                        <Input/>
                    </div>
                    {// use readonly input attribute
                    }
                    <div className="flex">
                        <p>joined</p>
                        <p>this.props.user.joined</p>
                        <Input/>
                    </div>
                </div>
            </Form>
        );

    }

}

export default Profile;