import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
// import Nav from 'react-bootstrap/Nav'
import LoginModal from './LoginModal'
// import Nav from 'react-bootstrap/Nav'
import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { withSnackbar } from 'notistack'

const styles = {
  root: {
    flexGrow: 1
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
      modalOpen: false
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

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }
  handleClose = () => {
    this.setState({ modalOpen: false })
  };

  render () {
    const { classes } = this.props
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <div className="container">
              <Link to='/'>
                <div className="navbar-brand">
                  <i className="fas fa-globe fa-2x"></i>
                </div>
              </Link>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <Button variant="outlined" color="inherit" onClick={this.handleClickOpen}>
                  Sign In</Button>
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <a onClick={this.handleModalOpen} className="nav-link">
                          Sign Up
                </a>
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <LoginModal
          email={this.state.email}
          password={this.state.password}
          open={this.state.modalOpen}
          handleInputChange={this.handleInputChange}
          handleClose={this.handleClose}
          handleClickOpen={this.handleClickOpen}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

NewHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(withSnackbar(NewHeader)))
