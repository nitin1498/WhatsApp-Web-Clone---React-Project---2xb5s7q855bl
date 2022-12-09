import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
	const [seed, setSeed] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	useEffect(() => {
		db.collection("Groups")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setMessages(snapshot.docs.map((doc) => doc.data()))
			);
	}, [id]);

	const createChat = () => {
		const groupName = prompt("Please enter name for chat");
		if (groupName) {
			db.collection("Groups").add({
				name: groupName,
			});
		}
	};

	return !addNewChat ? (
		<Link to={`/groups/${id}`}>
			<div className="sidebarChat">
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className="sidebarChat__info">
					<h2>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add new chat</h2>
		</div>
	);
}

export default SidebarChat;
