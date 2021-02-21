import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
// import AccountCircle from './../../shared/account.png'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Nav from 'react-bootstrap/Nav'
import Tooltip from '@material-ui/core/Tooltip'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <Tooltip title="Account" aria-label="Account">
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <span className="material-icons" style={{ color: '#D1D7E0' }}>account_circle</span>
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem>
            <Nav.Link href="#change-password">Change Password</Nav.Link>
          </MenuItem>
          <MenuItem>
            <Nav.Link href="#sign-out">Sign Out</Nav.Link>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuAppBar)
