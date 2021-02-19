import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import Input from '@material-ui/core/Input'
// import InputLabel from '@material-ui/core/InputLabel'
// import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Form from 'react-bootstrap/Form'
import TextField from '@material-ui/core/TextField'
// import Grid from '@material-ui/core/Grid'

import Button from '@material-ui/core/Button'
// import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
})

function ScreenshotForm (props) {
  const { classes, handleSubmit, handleInputChange } = props

  return (
    <div>
      <Form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
        <FormControl className={classes.margin}>
          <TextField
            id="outlined-search"
            label="Title"
            name="title"
            onChange={handleInputChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows="4"
            name="description"
            onChange={handleInputChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </FormControl>
        {/* <Grid container spacing={8} alignItems="flex-start">
          <Grid item>
            <input type="file" onChange={onScreenshotChange} />
          </Grid>
          <Grid item> */}
        <FormControl className={classes.margin}>
          <TextField
            id="outlined-search"
            label="Screenshot Url"
            name="imagefile"
            onChange={handleInputChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </FormControl>
        <Button type="submit" variant="contained" color="default">
              Upload
          <span className="material-icons">cloud_upload</span>
        </Button>
        {/* </Grid>
        </Grid> */}
      </Form>
    </div>
  )
}

ScreenshotForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreenshotForm)
