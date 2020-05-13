import React, { Component } from "react";
import firebase from "../../firebase";
import { Menu, Icon } from "semantic-ui-react";

class DirectMessages extends Component {
  state = {
    users: [],
    currentUser: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenseRef: firebase.database().ref("presense"),
  };
  componentDidMount() {
    if (this.state.currentUser) {
      this.addListener(this.state.currentUser.uid);
    }
  }

  addListener = (currentUserUID) => {
    let loadedUsers = [];
    this.state.usersRef.on("child_added", (snap) => {
      if (currentUserUID !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

    this.state.connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = this.state.presenseRef.child(currentUserUID);
        ref.set(true);
        if (
          ref.onDisconnect().remove((err) => {
            if (err !== null) {
              console.error(err);
            }
          })
        );
      }
    });

    this.state.presenseRef.on("child_added", (snap) => {
      if (snap.key !== currentUserUID) {
        this.addStatusToUser(snap.key);
      }
    });

    this.state.presenseRef.on("child_removed", (snap) => {
      if (snap.key !== currentUserUID) {
        this.addStatusToUser(snap.key, false);
      }
    });
  };

  addStatusToUser = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (userId !== user.uid) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.connect(user);
    }, []);

    this.setState({ users: updatedUsers });
  };

  isUserOnline = (user) => {
    return user.status === "online";
  };

  render() {
    const { users } = this.state;
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" />
            DIRECT MESSAGES
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {users.map((user) => (
          <Menu.Item
            key={user.uid}
            onClick={() => console.log(user)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
          >
            <Icon
              name="circle"
              color={this.isUserOnline(user) ? "green" : "red"}
            />
            @ {user.name}
          </Menu.Item>
        ))}
      </Menu.Menu>
    );
  }
}
export default DirectMessages;
