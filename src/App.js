import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
	const [{ user }, ] = useStateValue();

	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<Router>
						<Sidebar />
						<Switch>
							<Route path="/groups/:groupId">
								<Chat />
							</Route>
							<Route path="/">
							<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
					alt="whatsapp img"
				/>
							</Route>
						</Switch>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
