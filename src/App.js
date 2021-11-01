import React from "react";
import './App.css';
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js"

class App extends React.Component {

	constructor() {
		super();
	}

	render() {

		return (
			<div>
				<Navigation/>
				<Logo/>
			</div>
		);

	}

}

export default App;
