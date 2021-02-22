// import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import HomePageHeroLayout from './HomePageHeroLayout'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import SignUpModal from './../Header/SignUpModal'
import React, { useState } from 'react'
import messages from '../AutoDismissAlert/messages'
import { signUp, signIn } from '../../api/auth'
import { withSnackbar } from 'notistack'

const backgroundImage = 'https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'

const styles = (theme) => createMuiTheme({
  spacing: [0, 4, 8, 16, 32, 64],
  background: {
    backgroundImage: { backgroundImage },
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center'
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: '4px',
    marginTop: '4px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '10px'
    }
  },
  more: {
    marginTop: '2px'
  }
})

function HomePageHero (props) {
  const [state, setState] = useState({ email: '', password: '', passwordConfirmation: '', openSignUp: false })
  const { classes } = props
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState, [name]: value
    }))
  }

  const handleClickSignUpOpen = () => {
    setState({ openSignUp: true })
  }

  const handleSignUpClose = (e) => {
    e.stopPropagation()
    setState({ openSignUp: false })
  }

  const handleSignUpSubmit = event => {
    event.preventDefault()

    const { enqueueSnackbar, history, setUser } = props

    signUp(state)
      .then(() => signIn(state))
      .then(res => setUser(res.data.user))
      .then(() => setState({ openSignUp: false }))
      // clear forms
      .then(() => setState({ email: '', password: '', passwordConfirmation: '' }))
      .then(() => enqueueSnackbar(messages.signUpSuccess, {
        variant: 'success'
      }))
      .then(() => history.push('/screenshots'))
      .catch(error => {
        setState({ email: '', password: '', passwordConfirmation: '' })
        enqueueSnackbar(messages.signUpFailure + error.message, {
          variant: 'error'
        })
      })
  }

  return (

    <MuiThemeProvider theme={styles.theme}>
      <HomePageHeroLayout backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Love taking screenshots?
        </Typography>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
          Upload them to Stalgiac.
        </Typography>
        <Typography variant="h5" color="inherit" className={classes.menuButton}>
          <Button variant="contained" color="secondary" onClick={handleClickSignUpOpen} style={{ color: '#FFFFFF' }}><SignUpModal
            email={state.email}
            password={state.password}
            passwordConfirmation={state.passwordConfirmation}
            open={state.openSignUp}
            handleInputChange={handleInputChange}
            handleSignUpClose={handleSignUpClose}
            handleClickSignUpOpen={handleClickSignUpOpen}
            handleSignUpSubmit={handleSignUpSubmit}
          />Sign Up</Button></Typography>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Stalgiac will organize your screenshots!
        </Typography>
      </HomePageHeroLayout>
    </MuiThemeProvider>
  )
}

HomePageHero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(withSnackbar(HomePageHero)))
