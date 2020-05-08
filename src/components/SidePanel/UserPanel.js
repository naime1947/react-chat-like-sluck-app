import React, { Component } from 'react'
import firebase from '../../firebase'
import {Grid, Header, Icon, Dropdown} from 'semantic-ui-react'

class UserPanel extends Component {
    state = {
        user:this.props.currentUser
    }

    userDropDownOptions = ()=>[
        {
            key: 'user',
        text: <span>Signed in as <strong>{this.state.user.displayName}</strong> </span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change avatar</span>,
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignOut} >Sign out</span>
        }
    ]
    
    handleSignOut = ()=>{
        firebase.auth().signOut().then( ()=> console.log('sign out') )
    }
    render() {
        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row style={{padding:'1.2em', margin:0}}>
                        <Header inverted  >
                            <Icon name="code" />
                            <Header.Content>Dev Chat</Header.Content>
                        </Header>
                    </Grid.Row>
                    <Header as="h4" inverted padding="0.2em">
                        <Dropdown trigger={
                            <span>{this.state.user.displayName}</span>
                        } options={
                            this.userDropDownOptions()
                        } />
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}
export default UserPanel;