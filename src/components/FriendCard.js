import React, { Component } from 'react'
import './styles/Friend.css'

class FriendCard extends Component {
    render() {
        const { photo_200_orig, first_name, last_name } = this.props.friend

        return (
            <div className="friend-card">
                <img src={photo_200_orig} alt="User avatar" />
                <h2>{first_name} {last_name}</h2>
            </div>
        )
    }
}

export default FriendCard