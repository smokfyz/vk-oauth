import React, { Component } from 'react'
import FriendCard from './FriendCard'
import './styles/Friend.css'

class FriendList extends Component {
    render() {
        const { friends } = this.props

        return (
            <div className="friend-list">
                {friends.map((friend, id) => <FriendCard key={id} friend={friend} />)}
            </div>
        )
    }
}

export default FriendList