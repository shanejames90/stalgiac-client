import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SignUpModal = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleSignUpClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            value={props.email}
            label="Email"
            type="email"
            fullWidth
            onChange={props.handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="password"
            value={props.password}
            label="Password"
            type="password"
            fullWidth
            onChange={props.handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="passwordConfirmation"
            value={props.passwordConfirmation}
            label="Password Confirmation"
            type="password"
            fullWidth
            onChange={props.handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleSignUpClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={props.handleSignUpSubmit} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SignUpModal
