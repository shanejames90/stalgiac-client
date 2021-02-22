import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { withSnackbar } from 'notistack'
import Tooltip from '@material-ui/core/Tooltip'
import MenuAppBar from './Appbar.js'
import BottomAppBar from './Bottomnav.js'

const styles = {
  root: {
    flexGrow: 1
  },
  bar: {
    backgroundColor: '#000000'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class NewHeader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      modalOpen: false,
      openSignUp: false
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
      .then(() => this.setState({ modalOpen: false }))
      // clear forms
      .then(() => this.setState({ email: '', password: '' }))
      .then(() => enqueueSnackbar(messages.signInSuccess, {
        variant: 'success'
      }))
      .then(() => history.push('/screenshots'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        enqueueSnackbar(messages.signInFailure + error.message, {
          variant: 'error'
        })
      })
  }
  handleSignUpSubmit = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => this.setState({ openSignUp: false }))
      // clear forms
      .then(() => this.setState({ email: '', password: '', passwordConfirmation: '' }))
      .then(() => enqueueSnackbar(messages.signUpSuccess, {
        variant: 'success'
      }))
      .then(() => history.push('/screenshots'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        enqueueSnackbar(messages.signUpFailure + error.message, {
          variant: 'error'
        })
      })
  }
  handleClickSignUpOpen = () => {
    this.setState({ openSignUp: true })
  }

  handleSignUpClose = () => {
    this.setState({ openSignUp: false })
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  };

  render () {
    const { classes, user } = this.props
    let unauthenticatedOptions
    let authenticatedOptions
    if (!user) {
      unauthenticatedOptions =
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
                Stalgiac
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.menuButton}>
            <Tooltip title="Home" aria-label="Home">
              <Button color="inherit" href="#/" style={{ color: '#FFFFFF' }}><span className="material-icons">home</span></Button>
            </Tooltip>
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.menuButton}>
            <Button color="inherit" onClick={this.handleClickOpen}>
                Sign In</Button>
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.menuButton}>
            <Button color="inherit" onClick={this.handleClickSignUpOpen} style={{ color: '#FC4445' }}>
              Sign Up</Button>
          </Typography>
        </Toolbar>
    }
    if (user) {
      authenticatedOptions =
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
            Stalgiac
        </Typography>
        <Typography variant="h6" color="inherit" className={classes.menuButton}>
          <Tooltip title="Home" aria-label="Home">
            <Button color="inherit" href="#/home" style={{ color: '#FFFFFF' }}><span className="material-icons">home</span></Button>
          </Tooltip>
        </Typography>
        <Typography variant="h6" color="inherit" className={classes.menuButton}>
          <Tooltip title="Add a Screenshot" aria-label="Add a Screenshot">
            <Button color="inherit" href="#screenshots" style={{ color: '#16FFBD' }}>
              <span className="material-icons">add_a_photo</span></Button>
          </Tooltip>
        </Typography>
        <Typography variant="h6" color="inherit" className={classes.menuButton}>
          <Tooltip title="View your screenshots" aria-label="View your screenshots">
            <Button color="inherit" href="#index-screenshots" style={{ color: '#FFFFFF' }}>
              <span className="material-icons">view_list</span></Button>
          </Tooltip>
        </Typography>
        <MenuAppBar/>
        <BottomAppBar />
      </Toolbar>
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" expand="md" className={classes.bar}>
          { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
          {user ? authenticatedOptions : unauthenticatedOptions}
          <LoginModal
            email={this.state.email}
            password={this.state.password}
            open={this.state.modalOpen}
            handleInputChange={this.handleInputChange}
            handleClose={this.handleClose}
            handleClickOpen={this.handleClickOpen}
            handleSubmit={this.handleSubmit}
          />
          <SignUpModal
            email={this.state.email}
            password={this.state.password}
            passwordConfirmation={this.state.passwordConfirmation}
            open={this.state.openSignUp}
            handleInputChange={this.handleInputChange}
            handleSignUpClose={this.handleSignUpClose}
            handleClickSignUpOpen={this.handleClickSignUpOpen}
            handleSignUpSubmit={this.handleSignUpSubmit}
          />
        </AppBar>
      </div>
    )
  }
}

NewHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(withSnackbar(NewHeader)))
