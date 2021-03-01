import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Container from 'react-bootstrap/Container'

// import { spacing } from '@material-ui/system'

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '93vh',
      minHeight: 600,
      maxHeight: 1300
    }
  },
  container: {
    marginTop: '3px',
    marginBottom: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2
  },
  arrowDown: {
    position: 'absolute',
    bottom: '4px'
  }
})

function HomePageHeroLayout (props) {
  const { backgroundClassName, children, classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, backgroundClassName)} />
        <image
          className={classes.arrowDown}
          height="16"
          width="12"
          alt="arrow down"
        ><span className="material-icons">arrow_downward</span></image>
      </Container>
    </section>
  )
}

HomePageHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomePageHeroLayout)
