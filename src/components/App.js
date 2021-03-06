import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { Grid } from "semantic-ui-react";

class App extends Component {
  render() {
    const { currentChannel, currentUser, isPrivateChannel } = this.props;
    return (
      <Grid className="app" columns="equal" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel
          key={currentUser && currentUser.id}
          currentUser={currentUser}
        />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser = {currentUser}
            isPrivateChannel = {isPrivateChannel}
          />
        </Grid.Column>
        <Grid.Column width="4">
          <MetaPanel />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivatechannel
});
export default connect(mapStateToProps)(App);
