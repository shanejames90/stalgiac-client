import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import { postScreenshot } from '../../api/screenshot'
import NewScreenshotForm from './../../shared/NewScreenshotForm'
import messages from '../AutoDismissAlert/messages'
import { withSnackbar } from 'notistack'
// const ReactS3Uploader = require('react-s3-uploader')
// import S3FileUpload from 'react-s3'
import { uploadFile } from 'react-s3'
// import S3 from 'aws-s3'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
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

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: 'screenshots',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}
// const S3Client = new S3({
//   bucketName: process.env.REACT_APP_BUCKET_NAME,
//   dirName: 'screenshots',
//   region: 'us-east-1',
//   accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
// })
// const S3Client = new S3(config)

class NewPostScreenshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      screenshot: {
        title: '',
        description: '',
        imagefile: ''
      },
      createdId: null
    }
    this.upload = this.upload.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // on file select
  // handleInputFile = (event) => {
  //   event.preventDefault()
  //   this.setState({ sspic: event.target.files[0] })
  // }
  //
  // handleInputUpload = event => {
  //   const { enqueueSnackbar } = this.props
  //   event.preventDefault()
  //   const data = new FormData(event.target)
  //   data.append('file', this.state.screenshot.sspic)
  //
  //   axios.post(apiUrl + '/media/', data)
  //     .then(() => {
  //       this.props.history.push('/')
  //     })
  //     .catch(error => {
  //       enqueueSnackbar(messages.createScreenshotFailure + error.message, {
  //         variant: 'error'
  //       })
  //     })
  // }

  // onScreenshotChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     this.setState({
  //       imagefile: URL.createObjectURL(event.target.files[0])
  //     })
  //   }
  // }
  upload = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    uploadFile(file, config)
      .then((data) => {
        this.setState(state => {
          return {
            screenshot: {
              ...state.screenshot,
              imagefile: data.location
            }
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // upload = (event) => {
  //   uploadFile(event.target.files[0], config)
  //     .then((data) => {
  //       this.setState(state => {
  //         return {
  //           screenshot: {
  //             ...state.screenshot,
  //             imagefile: data.location
  //           }
  //         }
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  // upload = (event) => {
  //   S3Client
  //     .uploadFile(event.target.files[0])
  //     .then((data) => {
  //       this.setState(state => {
  //         return {
  //           screenshot: {
  //             ...state.screenshot,
  //             imagefile: data.location
  //           }
  //         }
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  // handleInputChange = event => {
  //   if (event.target.type === 'location') {
  //     const name = event.target.name
  //     this.setState({
  //       [name]: event.target.location
  //     })
  //   }
  //   event.persist()
  //   const target = event.target
  //   const value = event.target.type === 'location' ? event.target.location : event.target.value
  //   const updatedField = {
  //     [target.name]: value
  //   }
  //   this.setState((state) => {
  //     const newScreenshot = Object.assign({}, state.screenshot, updatedField)
  //     return { screenshot: newScreenshot }
  //   })
  // }

  handleInputChange = (event) => {
    event.persist()
    this.setState(state => {
      return {
        screenshot: {
          ...state.screenshot,
          [event.target.name]: event.target.value
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
      const { user, enqueueSnackbar, history } = this.props
      const { screenshot } = this.state
      postScreenshot(user, screenshot)
        .then(res => {
          this.setState({ createdId: res.data.screenshot.id })
          return res
        })
        .then(() => enqueueSnackbar(messages.createScreenshotSuccess, {
          variant: 'success'
        }))
        .then(() => history.push('/index-screenshots'))
        .catch(error => {
          this.setState({ screenshot: '' })
          enqueueSnackbar(messages.createScreenshotFailure + error.message, {
            variant: 'error'
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
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <NewScreenshotForm
              title={this.state.screenshot.title}
              description={this.state.screenshot.description}
              imagefile={this.state.screenshot.imagefile}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
              upload={this.upload}
            />
          </div>
        </div>
      )
    }
}

export default withRouter(withStyles(styles)(withSnackbar(NewPostScreenshot)))
