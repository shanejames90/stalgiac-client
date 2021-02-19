import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
// import { withStyles } from '@material-ui/core/styles'
// import Input from '@material-ui/core/Input'
// import InputLabel from '@material-ui/core/InputLabel'
// import InputAdornment from '@material-ui/core/InputAdornment'
// import FormControl from '@material-ui/core/FormControl'
// import TextField from '@material-ui/core/TextField'
// import Grid from '@material-ui/core/Grid'
// import { postScreenshot } from '../../api/screenshot'
import ScreenshotForm from './../../shared/ScreenshotForm'
// import messages from '../AutoDismissAlert/messages'

class PostScreenshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      screenshot: {
        title: '',
        description: '',
        imagefile: null
      }
    }
  }

  // on file select
    onScreenshotChange = (event) => {
      this.setState({ imagefile: event.target.files[0] })
    }

    handleInputChange = (event) => {
      event.persist()
      this.setState(currState => {
        const { name, value } = event.target
        const updatedField = {
          [name]: value
        }
        const newTitle = {
          ...currState.title,
          ...updatedField
        }
        return { title: newTitle }
      })
    }
    handleInputChange = (event) => {
      event.persist()
      this.setState(currState => {
        const { name, value } = event.target
        const updatedField = {
          [name]: value
        }
        const newDescription = {
          ...currState.description,
          ...updatedField
        }
        return { description: newDescription }
      })
    }

    // on file upload
    handleSubmit = (event) => {
      event.preventDefault()
      console.log(this.state.title)
      console.log(this.state.description)
      console.log(this.state.imagefile)
      // const { user, msgAlert } = this.props
      // const { screenshot, sstext } = this.state
      // postScreenshot(user, screenshot, sstext)
      //   .then(() => msgAlert({
      //     heading: 'Purchase successful.',
      //     message: messages.createScreenshotSuccess,
      //     variant: 'success'
      //   }))
      //   .then(() => history.push('/purchases'))
      //   .catch(error => {
      //     this.setState({ screenshot: '', sstext: '' })
      //     msgAlert({
      //       heading: 'Purchase Failed with error: ' + error.message,
      //       message: messages.createPurchaseFailure,
      //       variant: 'danger'
      //     })
      //   })
    }

  screenshotData = () => {
    if (this.state.screenshot) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h4>Select a file before pressing Upload</h4>
        </div>
      )
    }
  }

  render () {
    return (
      <Fragment>
        <h2>New Screenshot</h2>
        <ScreenshotForm
          title={this.state.title}
          description={this.state.description}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          onScreenshotChange={this.onScreenshotChange}
        />
        {this.screenshotData()}
      </Fragment>
    )
  }
}

export default withRouter(PostScreenshot)
