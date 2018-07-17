import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CornestoneImage } from '../CornestoneImage/CornestoneImage';
import UploadImageButton from '../UploadImageButton/UploadImageButton';
import CornestoneOptionsButtons from '../CornestoneOptionsButtons/CornestoneOptionsButtons';
import './AppContent.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 15
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  dicomContainer: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  title: {
    marginBottom: 16,
  }
});

function AppContent(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="headline" component="h1" className={classes.title}>
           How to use it?
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <CornestoneOptionsButtons/>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.dicomContainer}>
            <div className="row-image-title">
              <Typography variant="headline" component="h5" className={classes.title}>
                Image
              </Typography>
              <UploadImageButton/>
            </div>
            <CornestoneImage/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppContent);