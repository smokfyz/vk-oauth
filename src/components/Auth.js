import React, { Component } from 'react'
import './styles/Auth.css'

class Auth extends Component {
    render() {
        return (
            <div className="auth">
                <button className="auth-btn" onClick={this.props.login}>Авторизоваться</button>
            </div>
        )
    }
}

export default Auth