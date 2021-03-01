import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import Input from '@material-ui/core/Input'
// import InputLabel from '@material-ui/core/InputLabel'
// import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Form from 'react-bootstrap/Form'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
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
    height: 500
  }
})

function NewScreenshotForm (props) {
  const { classes, handleSubmit, handleInputChange, upload } = props

  return (
    <div className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList}>
        <GridListTile cols={1} style={{ height: 'auto', marginTop: '' }}>
          <ListSubheader component="div">New Screenshot</ListSubheader>
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
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item>
                <input
                  name="imagefile"
                  type="file"
                  onChange={upload}
                />
              </Grid>
            </Grid>
            {/* <FormControl className={classes.margin}>
              <TextField
                id="outlined-search"
                label="Screenshot Url"
                name="imagefile"
                onChange={handleInputChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <input type="file" id="file_input" />
              <p id="status">Please select a file</p>
            </FormControl> */}
            <Button type="submit" variant="contained" style={{ marginLeft: '10px', color: '#8EE4AF' }}>
                  Upload
              <span className="material-icons">cloud_upload</span>
            </Button>
            {/* </Grid>
            </Grid> */}
          </Form>
        </GridListTile>
      </GridList>
    </div>
  )
}

NewScreenshotForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewScreenshotForm)
