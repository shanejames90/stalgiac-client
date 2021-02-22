import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from 'react-bootstrap/Container'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden'
  },
  container: {
    // marginTop: theme.spacing(10),
    // marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    // padding: theme.spacing(0, 5)
  },
  title: {
    color: '#FFFFFF'
    // marginBottom: theme.spacing(14)
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: '#000000',
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 55
    // marginTop: theme.spacing(4),
    // marginBottom: theme.spacing(4)
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7
  },
  button: {
    // marginTop: theme.spacing(8)
  },
  filler: {
    heigh: '100px'
  }
})

function ProductHowItWorks (props) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src='https://s3-us-west-2.amazonaws.com/builderbunch-dev-bucket/wp-content/uploads/2017/12/20152223/register-icon.png'
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center" style={{ color: '#FFFFFF' }}>
                  Register. It is free!
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src='https://freeiconshop.com/wp-content/uploads/edd/upload-cloud-flat.png'
                  alt="cloud"
                  className={classes.image}
                />
                <Typography variant="h5" align="center" style={{ color: '#FFFFFF' }}>
                  Upload your screenshots for Free.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src='https://transplantliving.org/wp-content/uploads/sites/2/icon-organized@2x.png'
                  alt="clipboard"
                  className={classes.image}
                />
                <Typography variant="h5" align="center" style={{ color: '#FFFFFF' }}>
                  {'All your screenshots in one place. Update as you like!'}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ height: '200px' }}></div>
      </Container>
    </section>
  )
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductHowItWorks)
