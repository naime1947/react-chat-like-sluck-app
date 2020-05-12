import React, { Component } from 'react'
import {Segment, Header, Icon, Input} from 'semantic-ui-react'

class MessageHeader extends Component {
    render() {
        const {channelName,numUniqueUsers} = this.props;
        return (
            <Segment clearing >
                {/* message header area  */}
                <Header as="h2" fluid="true" floated="left" style={{marginBottom: 0}} >
                <span>
                {channelName} 
                <Icon name={'star outline'} color="black" />
                </span>
                <Header.Subheader>
                    {numUniqueUsers} 
                </Header.Subheader>
                </Header>

                {/* message search input  */}
                <Header floated="right" >
                    <Input
                        size="mini"
                        icon="search"
                        name='searchTerm'
                        placeholder="Search messages"
                    />
                </Header>
            </Segment>
        )
    }
}

export default MessageHeader;
