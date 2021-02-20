import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { showScreenshot, deleteScreenshot } from '../../api/screenshot'
import messages from '../AutoDismissAlert/messages'

import Bgimage from './../../shared/bgimage.png'

import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import ShareIcon from '@material-ui/icons/Share'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class ShowScreenshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      screenshot: null,
      deleted: false,
      expanded: false,
      show: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    // request single screenshot
    showScreenshot(match.params.id, user)
      .then(res => this.setState({ screenshot: res.data.screenshot }))
      .then(() => msgAlert({
        heading: 'Showing Screenshot Successfully',
        message: 'Your screenshot is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to show your screenshot',
          message: 'Failed to show screenshot with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleDeleteClick = async (event) => {
    event.preventDefault()
    const { msgAlert, user, history } = this.props

    try {
      await deleteScreenshot(this.props.match.params.id, user)
        .then(() => this.setState({ deleted: true }))
        .then(() => history.push('/index-screenshots'))
        .then(() => msgAlert({
          heading: 'Deleted Succesfully',
          message: messages.deleteScreenshotSuccess,
          variant: 'success'
        }))
    } catch (err) {
      msgAlert({
        heading: 'Update Comment failed with error: ' + err.message,
        message: messages.deleteScreenshotFailure,
        variant: 'danger'
      })
    }
  }

  handleUpdateClick = () => {
    const { history } = this.props
    const path = '/update-screenshot/:id'
    history.push(path)
  }

  render () {
    const { classes } = this.props
    const { screenshot, deleted } = this.state

    if (!screenshot) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the purchase is deleted
    if (deleted) {
      return <Redirect to="/screenshots/" />
    }

    return (
      <Card className={classes.card}>
        <CardHeader
          title={screenshot.title}
          subheader={screenshot.imagefile}
        />
        <CardMedia
          className={classes.media}
          image={Bgimage}
          title="screenshot"
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Delete" className={classes.margin} onClick={this.handleDeleteClick}>
            <span className="material-icons">delete_outline</span>
          </IconButton>
          <IconButton aria-label="Update" onClick={this.handleUpdateClick}>
            <span className="material-icons">update</span>
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <span className="material-icons">expand_more</span>
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>
              {screenshot.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

// exports
export default withRouter(withStyles(styles)(ShowScreenshot))
