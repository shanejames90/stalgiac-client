import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import Input from '@material-ui/core/Input'
// import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import Button from '@material-ui/core/Button'
// import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
})

function ScreenshotForm (props) {
  const { classes, handleSubmit, handleInputChange, title, description } = props

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.margin}>
          <FormControl className={classes.margin}>
            <TextField
              id="outlined-search"
              label="Title"
              name="title"
              value={title}
              onChange={handleInputChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </FormControl>
        </div>
        <div className={classes.margin}>
          <FormControl className={classes.margin}>
            <TextField
              id="outlined-multiline-static"
              startAdornment={
                <InputAdornment position="start">
                  <span className="material-icons">
                    description
                  </span>
                </InputAdornment>
              }
              label="Description"
              multiline
              rows="4"
              name="description"
              value={description}
              onChange={handleInputChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </FormControl>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-start">
            <Grid item>
              <span className="material-icons">attach_file</span>
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="attach your screenshot" />
            </Grid>
            <Grid item>
              <Button variant="contained" color="default" type="submit" className={classes.button}>
                Upload
                <span className="material-icons">cloud_upload</span>
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  )
}

ScreenshotForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreenshotForm)
