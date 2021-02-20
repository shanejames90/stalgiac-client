import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { showScreenshot, deleteScreenshot, updateScreenshot } from '../../api/screenshot'

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

import UpdateScreenshotForm from './../../shared/UpdateScreenshotForm'

// import FormControl from '@material-ui/core/FormControl'
// import Form from 'react-bootstrap/Form'
// import TextField from '@material-ui/core/TextField'
// import Grid from '@material-ui/core/Grid'
// import GridListTile from '@material-ui/core/GridListTile'
// import GridList from '@material-ui/core/GridList'
// import ListSubheader from '@material-ui/core/ListSubheader'

// import Button from '@material-ui/core/Button'

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
      screenshot: {
        title: '',
        description: '',
        imagefile: '',
        newtitle: this.props.newtitle,
        newdescription: this.props.newdescription,
        newimagefile: this.props.newimagefile
      },
      updated: false,
      deleted: false,
      expanded: false
    }
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
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
  componentDidUpdate () {
    const { user, match } = this.props
    if (!this.state.screenshot && this.state.updated === true) {
      showScreenshot(match.params.id, user)
        .then((res) => this.setState({ screenshot: res.data.screenshot }))
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    try {
      await updateScreenshot(this.props.match.params.id, this.state, user)
        .then(() => this.setState({ updated: true, screenshot: '' }))
        .then(() => this.setState({ updated: false }))
        .then(() => msgAlert({
          heading: 'Updated Succesfully',
          message: messages.updateScreenshotSuccess,
          variant: 'success'
        }))
    } catch (err) {
      msgAlert({
        heading: 'Update Comment failed with error: ' + err.message,
        message: messages.updateScreenshotFailure,
        variant: 'danger'
      })
    }
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

  render () {
    const { classes } = this.props
    const { deleted, screenshot } = this.state

    if (!screenshot) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the screenshot is deleted
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
        <CardContent>
          <Typography component="p">
            {screenshot.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Delete" className={classes.margin} onClick={this.handleDeleteClick}>
            <span className="material-icons">delete_outline</span>
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Update"
          >
            <span className="material-icons">update</span>
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <UpdateScreenshotForm
              newtitle={screenshot.newtitle}
              newdescription={screenshot.newdescription}
              newimagefile={screenshot.newimagefile}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
            />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

// exports
export default withRouter(withStyles(styles)(ShowScreenshot))
