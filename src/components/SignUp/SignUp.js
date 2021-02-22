import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import { withSnackbar } from 'notistack'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

import SignUpForm from './../../shared/SignUpForm'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
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

    const { enqueueSnackbar, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signUpSuccess, {
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        enqueueSnackbar(messages.signUpFailure + error.message, {
          variant: 'error'
        })
      })
  }

  render () {
    // const { email, password, passwordConfirmation } = this.state

    return (
      <SignUpForm
        email={this.state.email}
        password={this.state.password}
        passwordConfirmation={this.state.passwordConfirmation}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
      />
    )
  }
}

export default withRouter(withSnackbar(SignUp))
