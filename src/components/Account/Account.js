import "./Account.css";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";

const Account = (props) => {

    return (
        <div className="account">
            <p>Name</p>
            <Input id="editNameInput" onKeyPress={props.onEnterPress} onChange={props.onNameChange} placeHolder={props.user.name} className="accountInput focus"/>
            <p>Email</p>
            <Input id="editEmailInput" onKeyPress={props.onEnterPress} onChange={props.onEmailChange} placeHolder={props.user.email} className="accountInput"/>
            <p>Password</p>
            <Input id="editPasswordInput" onKeyPress={props.onEnterPress} onChange={props.onPasswordChange} placeHolder={"**********"} type="password" className="accountInput"/>
            <p>Joined</p>
            <Input placeHolder={props.user.joined} className="accountInput" readOnly={true}/>
            <Button onClick={props.onSaveClick} text="Save Changes" className="accountButton"/>
        </div>
    );

}

export default Account;