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
import GridListTile from '@material-ui/core/GridListTile'
import GridList from '@material-ui/core/GridList'
import ListSubheader from '@material-ui/core/ListSubheader'

import Button from '@material-ui/core/Button'
// import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 200
  }
})

function UpdateScreenshotForm (props) {
  const { classes, handleSubmit, handleInputChange } = props

  return (
    <div className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList}>
        <GridListTile cols={1} style={{ height: 'auto', marginTop: '' }}>
          <ListSubheader component="div">Update This Screenshot</ListSubheader>
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
            <Button type="submit" variant="contained" color="default" style={{ marginLeft: '10px' }}>
                  Update
              <span className="material-icons">cloud_upload</span>
            </Button>
          </Form>
        </GridListTile>
      </GridList>
    </div>
  )
}

UpdateScreenshotForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UpdateScreenshotForm)
