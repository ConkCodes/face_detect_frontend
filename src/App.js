import React from "react";
import './App.css';
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import Rank from "./components/Rank/Rank.js";

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 300
			}
		}
	}
}

class App extends React.Component {

	constructor() {
		super();
	}

	render() {

		return (
			<div>
				<Particles className="fixed" params={particlesOptions}/>
				<Navigation/>
				<Logo/>
				<Rank/>
			</div>
		);

	}

}

export default App;
