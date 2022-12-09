import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useState, useEffect } from "react";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
	const [{user}, ] = useStateValue();
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const unsubscribe = db.collection("Groups").onSnapshot((snapshot) =>
			setGroups(
				snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
			)
		);

		return () => unsubscribe();
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src={user?.photoURL}/>
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlinedIcon />
					<input placeholder="Search or start new chat" type="text" />
				</div>
			</div>
			<div className="sidebar__chats">
				<SidebarChat addNewChat />
				{groups.map((group) => (
					<SidebarChat key={group.id}
						id = {group.id}
						name = {group.data.name}
					/>
				))}
			</div>
		</div>
	);
}

export default Sidebar;
