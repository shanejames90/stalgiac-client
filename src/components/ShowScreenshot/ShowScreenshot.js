import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { showScreenshot, deleteScreenshot, updateScreenshot } from '../../api/screenshot'

import messages from '../AutoDismissAlert/messages'
import { withSnackbar } from 'notistack'

// import Bgimage from './../../shared/bgimage.png'

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
import S3FileUpload from 'react-s3'

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

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: 'screenshots',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

class ShowScreenshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      screenshot: {
        title: '',
        description: '',
        imagefile: ''
      },
      updated: false,
      deleted: false,
      expanded: false
    }
    this.upload = this.upload.bind(this)
  }

  async componentDidMount () {
    const { user, match, enqueueSnackbar } = this.props
    // request single screenshot
    try {
      await showScreenshot(match.params.id, user)
        .then(res => this.setState({ screenshot: res.data.screenshot }))
        .then(() => this.setState({ updated: false }))
        .then(() => enqueueSnackbar(messages.showScreenshotSuccess, {
          variant: 'success'
        }))
    } catch (err) {
      enqueueSnackbar(messages.showScreenshotFailure + err.message, {
        variant: 'error'
      })
    }
  }

  upload = (event) => {
    S3FileUpload.uploadFile(event.target.files[0], config)
      .then((data) => {
        this.setState({ screenshot: { imagefile: data.location } })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleInputChange = event => {
    if (event.target.type === 'location') {
      const name = event.target.name
      this.setState({
        [name]: event.target.location
      })
    }
    event.persist()
    const target = event.target
    const value = event.target.type === 'location' ? event.target.location : event.target.value
    const updatedField = {
      [target.name]: value
    }
    this.setState((state) => {
      const newScreenshot = Object.assign({}, state.screenshot, updatedField)
      return { screenshot: newScreenshot }
    })
  }

  // handleInputChange = (e) => {
  //   e.persist()
  //   this.setState(currState => {
  //     const { name, value } = e.target
  //     const updatedField = {
  //       [name]: value
  //     }
  //     // console.log({ ...updatedField, ...currState.screenshot })
  //     // console.log({ ...currState.screenshot, ...updatedField })
  //     const newScreenshot = {
  //       ...currState.screenshot,
  //       ...updatedField
  //     }
  //     // console.log(newScreenshot)
  //     return { screenshot: newScreenshot }
  //   })
  // }

  handleSubmit = async (e) => {
    e.preventDefault()
    e.target.reset()
    this.setState({ expanded: false })
    const { user, enqueueSnackbar, match } = this.props
    try {
      await updateScreenshot(match.params.id, this.state.screenshot, user)
        .then(() => this.setState({ updated: true }))
        // .then(() => this.setState({ updated: false }))
        .then(() => enqueueSnackbar(messages.updateScreenshotSuccess, {
          variant: 'success'
        }))
    } catch (err) {
      enqueueSnackbar(messages.updateScreenshotFailure + err.message, {
        variant: 'error'
      })
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.screenshot !== prevProps.screenshot) {
      this.setState({ screenshot: this.props.screenshot })
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  // handleClick = () => {
  //   const { history } = this.props
  //   history.push(`/update-screenshot/${this.props.match.params.id}`)
  // }

  handleDeleteClick = async (event) => {
    event.preventDefault()
    const { enqueueSnackbar, user, history } = this.props

    try {
      await deleteScreenshot(this.props.match.params.id, user)
        .then(() => this.setState({ deleted: true }))
        .then(() => history.push('/index-screenshots'))
        .then(() => enqueueSnackbar(messages.deleteScreenshotSuccess, {
          variant: 'success'
        }))
    } catch (err) {
      enqueueSnackbar(messages.deleteScreenshotFailure + err.message, {
        variant: 'error'
      })
    }
  }

  render () {
    const { classes } = this.props
    const { deleted } = this.state
    const { screenshot } = this.state

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
      <Card className={classes.card} style={{ marginLeft: '30px' }}>
        <CardHeader
          title={screenshot.title}
          subheader={screenshot.imagefile}
        />
        <CardMedia
          className={classes.media}
          image={screenshot.imagefile}
          title="screenshot"
        />
        <CardContent>
          <Typography component="p">
            {screenshot.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Delete" className={classes.margin} onClick={this.handleDeleteClick}>
            <span className="material-icons" style={{ color: '#FC4445' }}>delete_outline</span>
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Update"
          >
            <span className="material-icons" style={{ color: '#4285F4' }}>update</span>
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <UpdateScreenshotForm
              title={this.state.screenshot.title}
              description={this.state.screenshot.description}
              imagefile={this.state.screenshot.imagefile}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
              upload={this.upload}
            />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

// exports
export default withRouter(withStyles(styles)(withSnackbar(ShowScreenshot)))
