// imports
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexScreenshots } from '../../api/screenshot'
import { withStyles } from '@material-ui/core/styles'
// import ScreenshotList from './../../shared/ScreenshotList'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
// import IconButton from '@material-ui/core/IconButton'
// import InfoIcon from '@material-ui/icons/Info'
// import Bgimage from './../../shared/bgimage.png'
import { withSnackbar } from 'notistack'
import messages from '../AutoDismissAlert/messages'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 600
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
})

class IndexScreenshots extends Component {
  constructor (props) {
    super(props)

    this.state = {
      screenshots: null
    }
  }

  componentDidMount () {
    const { user, enqueueSnackbar } = this.props
    indexScreenshots(user)
      // .then(res => console.log(res.data))
      .then(res => this.setState({ screenshots: res.data.screenshots }))
      .then(() => enqueueSnackbar(messages.indexScreenshotsSuccess, {
        variant: 'success'
      }))
      .catch(console.error)
  }

  render () {
    const { classes } = this.props

    let screenshotsJSX
    if (!this.state.screenshots) {
      screenshotsJSX = 'Loading...'
    } else if (this.state.screenshots.length === 0) {
      screenshotsJSX = 'No screenshots yet! Start uploading!'
    } else {
      screenshotsJSX = this.state.screenshots.map(screenshot => (
        <GridListTile key={screenshot.id}>
          <img src={screenshot.imagefile} alt={screenshot.title} />
          <GridListTileBar
            title={screenshot.title}
            subtitle={screenshot.imagefile}
            actionIcon={
              <Link to={`/screenshots/${screenshot.id}`}>
                <span className="material-icons">link</span>
              </Link>
            }
          />
        </GridListTile>
      ))
    }
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto', marginTop: '10px' }}>
            <ListSubheader component="div">Screenshots</ListSubheader>
          </GridListTile>
          {screenshotsJSX}
        </GridList>
      </div>
    )
  }
}

// exports
export default withRouter(withStyles(styles)(withSnackbar(IndexScreenshots)))
