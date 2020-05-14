import React, { Component } from 'react'
import firebase from '../../firebase'
import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react'

class UserPanel extends Component {
    state = {
        user:this.props.currentUser
    }

    userDropDownOptions = ()=>[
        {
            key: 'user',
        text: <span>Signed in as <strong>{this.state.user && this.state.user.displayName}</strong> </span>,
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
        const {user} = this.state;

        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row style={{padding:'1.2em', margin:0}}>
                        <Header inverted  >
                            <Icon name="code" />
                            <Header.Content>Dev Chat</Header.Content>
                        </Header>
                    
                    <Header as="h4" inverted style={{padding:"0.25em"}}>
                        <Dropdown trigger={
                            
                            <span>
                                <Image src={user && user.photoURL} avatar spaced="right" />
                                {user && user.displayName}
                            </span>
                        } options={
                            this.userDropDownOptions()
                        } />
                    </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}
export default UserPanel;