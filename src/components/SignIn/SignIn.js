import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import SignInForm from './../../shared/SignInForm'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

import { withSnackbar } from 'notistack'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange = (event) => {
    event.persist()
    this.setState(state => {
      return {
        ...this.state, [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { history, setUser, enqueueSnackbar } = this.props
    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signInSuccess, {
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        enqueueSnackbar(messages.signInFailure + error.message, {
          variant: 'error'
        })
      })
  }

  render () {
    // const { email, password } = this.state

    return (
      <SignInForm
        email={this.state.email}
        password={this.state.password}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
      />
    )
  }
}

export default withRouter(withSnackbar(SignIn))
