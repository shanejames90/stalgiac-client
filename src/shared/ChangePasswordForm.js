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
// import IconButton from '@material-ui/core/IconButton'
// import InputAdornment from '@material-ui/core/InputAdornment'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'

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

function ChangePasswordForm (props) {
  const { classes, handleSubmit, handleInputChange, oldPassword, newPassword } = props

  return (
    <div className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList}>
        <GridListTile cols={1} style={{ height: 'auto', marginTop: '' }}>
          <ListSubheader component="div">Change Your Password</ListSubheader>
          <Form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
            <FormControl className={classes.margin}>
              <TextField
                required
                id="outlined-search"
                label="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={handleInputChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type="password"
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <TextField
                required
                id="outlined-multiline-static"
                label="New Password"
                name="newPassword"
                value={newPassword}
                onChange={handleInputChange}
                className={classes.textField}
                margin="normal"
                type="password"
                variant="outlined"
                InputProps={{
                }}
              />
            </FormControl>
            <Button type="submit" variant="contained" style={{ marginLeft: '10px', color: '#F070A1' }}>
                  Submit
              <span className="material-icons">verified</span>
            </Button>
          </Form>
        </GridListTile>
      </GridList>
    </div>
  )
}

ChangePasswordForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChangePasswordForm)
