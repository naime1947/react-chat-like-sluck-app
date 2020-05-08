import React, { Component } from 'react'
import {connect} from 'react-redux'
import "./App.css"
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel'
import {Grid} from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Grid className="app" columns="equal" style={{background:'#eee'}}>
        <SidePanel currentUser = {this.props.currentUser} />
        <ColorPanel/>
        <Grid.Column style={{background: '#000', marginLeft: 320}}>
          <Messages />
        </Grid.Column>
        <Grid.Column width="4">
        <MetaPanel/>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state=>({
  currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(App) ;