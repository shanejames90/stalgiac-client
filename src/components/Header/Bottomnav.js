import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    color: '#FFFFFF'
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
})

function BottomAppBar (props) {
  const { classes } = props
  return (
    <React.Fragment>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Tooltip title="Add a Screenshot" aria-label="Add a Screenshot">
            <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
              <span className="material-icons"><a href="#screenshots">add</a></span>
            </Fab>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BottomAppBar)
