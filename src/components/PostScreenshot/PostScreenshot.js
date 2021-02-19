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

class PostScreenshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      upload: ''
    }
  }

  render () {
    return (
      <Fragment>
        <h2>New Screenshot</h2>
        <ScreenshotForm
          book={this.state.book}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />
      </Fragment>
    )
  }
}

export default withRouter(PostScreenshot)
