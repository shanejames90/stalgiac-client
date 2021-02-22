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

function SignInForm (props) {
  const { classes, handleSubmit, handleInputChange, email, password } = props

  return (
    <div className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList}>
        <GridListTile cols={1} style={{ height: 'auto', marginTop: '' }}>
          <ListSubheader component="div">Sign In</ListSubheader>
          <Form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
            <FormControl className={classes.margin}>
              <TextField
                required
                id="outlined-search"
                label="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.margin}>
              <TextField
                required
                id="outlined-multiline-static"
                label="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                InputProps={{
                }}
              />
            </FormControl>
            <Button type="submit" variant="contained" style={{ marginLeft: '10px', color: '#F070A1' }}>
                  Sign In
              <span className="material-icons">party_mode</span>
            </Button>
          </Form>
        </GridListTile>
      </GridList>
    </div>
  )
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignInForm)
