import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import HomePageHeroLayout from './HomePageHeroLayout'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
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
  const { classes } = props

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
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="a"
          href="/sign-up"
        >
          Register
        </Button>
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

export default withRouter(withStyles(styles)(HomePageHero))
