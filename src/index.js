import "./index.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Key } from "./components/Key.js"
import 'bulma/css/bulma.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Key />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
)
