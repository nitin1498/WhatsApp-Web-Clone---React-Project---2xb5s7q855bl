import { Avatar, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase/compat/app';

function Chat() {
	const [seed, setSeed] = useState("");
	const [input, setInput] = useState("");
	const { groupId } = useParams();
	const [groupName, setGroupName] = useState("");
	const [messages, setMessages] = useState([]);
	const [{user}, dispatch] = useStateValue();

	useEffect(() => {
		if (groupId) {
			db.collection("Groups")
				.doc(groupId)
				.onSnapshot((snapshot) => {
					setGroupName(snapshot.data().name);
				});

			db.collection("Groups")
				.doc(groupId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) => (
					setMessages(snapshot.docs.map((doc) => doc.data()))
				));
		}
		setSeed(Math.floor(Math.random() * 5000));
	}, [groupId]);

	useEffect(() => {}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		console.log(`you typed ${input}`);
		db.collection("Groups").doc(groupId).collection("messages").add({
			message : input,
			name : user.displayName,
			timestamp : firebase.firestore.FieldValue.serverTimestamp()
		});
		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className="chat__headerInfo">
					<h3>{groupName}</h3>
					<p>last seen {" "} 
					{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				
			{messages.map((message) => (
					<p key={message.id}
						className={`chat__message ${
							message.name === user.displayName && "chat__receiver"
						}`}
					>
						<span className="chat__name">{message.name}</span>
						{message.message}
						<span className="chat__timestamp">
							{new Date(
								message.timestamp?.toDate()).toUTCString()}
						</span>
					</p>
				))}
				
			</div>
			<div className="chat__footer">
				<InsertEmoticonIcon />
				<form>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message"
					/>
					<button type="submit" onClick={sendMessage}>
						Message
					</button>
				</form>
				<MicIcon />
			</div>
		</div>
	);
}

export default Chat;
