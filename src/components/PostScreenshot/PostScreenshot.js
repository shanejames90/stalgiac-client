import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import { postScreenshot } from '../../api/screenshot'
import ScreenshotForm from './../../shared/ScreenshotForm'
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

class PostScreenshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      screenshot: {
        title: '',
        description: '',
        imagefile: ''
      }
    }
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
    this.setState({
      [event.target.name]: event.target.value
    })
  }

    // on file upload
    handleSubmit = (event) => {
      event.preventDefault()
      // console.log(this.state.title)
      // console.log(this.state.description)
      // console.log(this.state.imagefile)
      const { user, msgAlert, history } = this.props
      // const { screenshot } = this.state
      postScreenshot(user, this.state)
        .then(() => msgAlert({
          heading: 'New screenshot added successfully!',
          message: messages.createScreenshotSuccess,
          variant: 'success'
        }))
        .then(() => history.push('/index-screenshots'))
        .catch(error => {
          this.setState({ screenshot: '' })
          msgAlert({
            heading: 'Screenshot Failed with error: ' + error.message,
            message: messages.createScreenshotFailure,
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
      return (
        <div>
          <ScreenshotForm
            title={this.state.screenshot.title}
            description={this.state.screenshot.description}
            imagefile={this.state.screenshot.imagefile}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
        </div>
      )
    }
}

export default withRouter(withStyles(styles)(PostScreenshot))