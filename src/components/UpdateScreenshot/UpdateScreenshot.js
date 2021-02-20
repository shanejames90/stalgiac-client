import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import { updateScreenshot, showScreenshot } from '../../api/screenshot'
import UpdateScreenshotForm from './../../shared/UpdateScreenshotForm'
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

class UpdateScreenshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      screenshot: null,
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    showScreenshot(match.params.id, user)
      .then(res => this.setState({ screenshot: res.data.screenshot }))
      .then(() => {
        msgAlert({
          heading: 'Showing screenshot Successfully',
          variant: 'success',
          message: 'Make your screenshot edits here.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Showing screenshot Failed',
          variant: 'danger',
          message: 'Screenshot is not displayed due to error: ' + err.message
        })
      })
  }

  // on file select
  // onScreenshotChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     this.setState({
  //       imagefile: URL.createObjectURL(event.target.files[0])
  //     })
  //   }
  // }

  // onScreenshotChange = (event) => {
  //   this.setState({ screenshot: event.target.files[0] })
  // }
  handleInputChange = (event) => {
    event.persist()
    this.setState(state => {
      return {
        screenshot: {
          ...state.screenshot, [event.target.name]: event.target.value
        }
      }
    })
  }

    // on file upload
    handleSubmit = (event) => {
      event.preventDefault()
      // console.log(this.state.title)
      // console.log(this.state.description)
      // console.log(this.state.imagefile)
      const { user, msgAlert, history, match } = this.props
      const { screenshot } = this.state
      // const { screenshot } = this.state
      updateScreenshot(match.params.id, screenshot, user)
        .then(res => this.setState({ updated: true }))
        .then(() => msgAlert({
          heading: 'Screenshot updated successfully!',
          message: messages.updateScreenshotSuccess,
          variant: 'success'
        }))
        .then(() => history.push(`/index-screenshot/${match.params.id}`))
        .catch(error => {
          this.setState({ screenshot: '' })
          msgAlert({
            heading: 'Update screenshot Failed with error: ' + error.message,
            message: messages.updateScreenshotFailure,
            variant: 'danger'
          })
        })
    }

    // screenshotData = () => {
    //   if (this.state.imagefile) {
    //     return (
    //       <div>
    //         <Card>
    //           <CardContent>
    //             <img id="target" src={this.state.imagefile}/>
    //           </CardContent>
    //         </Card>
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <div>
    //         <br />
    //       </div>
    //     )
    //   }
    // }

    render () {
      const { screenshot } = this.state
      if (!screenshot) {
        return '...loading, forever!'
      }
      return (
        <div>
          <UpdateScreenshotForm
            title={screenshot.title}
            description={screenshot.description}
            imagefile={screenshot.imagefile}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
        </div>
      )
    }
}

export default withRouter(withStyles(styles)(UpdateScreenshot))
