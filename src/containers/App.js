import React, { Component } from 'react';
import './styles/App.css';
import Auth from './../components/Auth'
import Profile from './../components/Profile'
import Loading from './../components/Loading'

const VK = window.VK;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      session: null,
      friends: null,
      userInfo: null,
      isLoading: true,
      showAuth: false
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    VK.init({
      apiId: 6658425
    })
    VK.Auth.getLoginStatus(session => {
      if(session.status === 'connected') {
        this.setState({
          session
        })
        this.getProfilesInfo()
        this.getFriendsList()
      } else {
        this.setState({
          showAuth: true
        })
      }
    })
  }

  componentDidUpdate() {
    const { isLoading, session, friends, userInfo } = this.state
    if(isLoading && session && friends && userInfo) {
      setTimeout(() => {
          this.setState({
            isLoading: false,
            showAuth: false
        })
      }, 1000)
    }
  }

  login() {
    VK.Auth.login(session => {
      if(session.session) {
        this.setState({
          showAuth: false
        })
        setTimeout(() => {
          this.setState({
            session
          })
        }, 1000);
        this.getProfilesInfo()
        this.getFriendsList()
      }
    })
  }

  logout() {
    VK.Auth.logout(session => {
      if(!session.session) {
        this.setState({
          session: null,
          showAuth: true
        })
      }
    })
  }

  getProfilesInfo(uids = '') {
    const settings = uids ? {v: '5.80', user_ids: uids, fields: 'photo_200_orig'} : 
                            {v: '5.80', fields: 'photo_200_orig'}

    VK.Api.call('users.get', settings, r => {
      const users = r.response
      if(!users) {
        setTimeout(this.getProfilesInfo.bind(this, uids), 1000)
        return
      }
      if(users.length === 1) {
        this.setState({
          userInfo: users[0]
        })
      } else {
        this.setState({
          friends: users
        })
      }
    })
  }

  getFriendsList() {
    VK.Api.call('friends.get', {v: '5.80'}, r => {
      if(!r.response) {
        setTimeout(this.getFriendsList.bind(this), 1000)
        return
      }
      let uids = this.getRandFiveFriends(r.response.items)
      this.getProfilesInfo(uids)
    })
  }

  getRandFiveFriends(friends) {
    let uids = []
    let count = friends.length

    for(let iter = 0; iter < 5; iter++) {
      let randIndex = Math.floor(Math.random()*count)
      uids = uids.concat(friends[randIndex])
      friends.splice(randIndex, 1)
      count--
    }

    return uids.join(',')
  }

  render() {
    const { session, isLoading, userInfo, friends, showAuth } = this.state
    let app = <Loading />;
    
    if(!isLoading && session && session.status === 'connected') {
      app = <Profile user={userInfo} friends={friends} logout={this.logout} />
    } else if(showAuth) {
      app = <Auth login={this.login} />
    }

    return (
      <div className="App">
        {app}
      </div>
    )
  }
}

export default App;