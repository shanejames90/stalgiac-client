import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
// import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
// import Header from './components/Header/Header'
import NewHeader from './components/Header/NewHeader'
// import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// import PostScreenshot from './components/PostScreenshot/PostScreenshot'
import NewPostScreenshot from './components/PostScreenshot/NewPostScreenshot'
import IndexScreenshots from './components/IndexScreenshots/IndexScreenshots'
import ShowScreenshot from './components/ShowScreenshot/ShowScreenshot'
// import UpdateScreenshot from './components/UpdateScreenshot/UpdateScreenshot'
import HomePageHero from './components/HomePageHero/HomePageHero'
import HomePageHowItWorks from './components/HomePageHero/HomePageHowItWorks'

import CustomizedSnackbars from './components/AutoDismissAlert/SnackAlerts.js'
// import { withRouter } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Route path='/' render={() => (
          <NewHeader user={user} setUser={this.setUser} msgAlert={this.msgAlert} />
        )} />
        <Route exact path='/' render={() => (
          <HomePageHero user={user} setUser={this.setUser} msgAlert={this.msgAlert} />
        )} />
        <Route exact path='/' render={() => (
          <HomePageHowItWorks user={user} setUser={this.setUser} msgAlert={this.msgAlert} />
        )} />
        {msgAlerts.map(msgAlert => (
          <CustomizedSnackbars
            key={msgAlert.id}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/screenshots' render={() => (
            <NewPostScreenshot msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/index-screenshots' render={({ props }) => (
            <IndexScreenshots msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/screenshots/:id' render={({ props }) => (
            <ShowScreenshot msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
