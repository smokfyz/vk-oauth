import React, { Component } from 'react'
import FriendList from './FriendList'
import './styles/Profile.css'

class Profile extends Component {
    render() {
        const { user, friends } = this.props

        return (
            <div className="profile">
                <h1>Привет, {user.first_name} {user.last_name}! <br /> Вот пять твоих друзей</h1>
                <button className="logout-btn" onClick={this.props.logout}>Выйти</button>
                <FriendList friends={friends} />
            </div>
        )
    }
}

export default Profile