import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
  },
  title: {
    marginBottom: 16,
  }
});

function CornestoneOptionsButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Typography variant="headline" component="h5" className={classes.title}>
        Options
      </Typography>
      <Button variant="outlined" color="primary" fullWidth={true} className={classes.button}>
        Contrast
      </Button>
      <Button variant="outlined" color="primary" fullWidth={true} className={classes.button}>
        Pan
      </Button>
      <Button variant="outlined" color="primary" fullWidth={true} className={classes.button}>
        Zoom
      </Button>
      <Button variant="outlined" color="primary" fullWidth={true} className={classes.button}>
        Length
      </Button>
      <Button variant="outlined" color="primary" fullWidth={true} className={classes.button}>
        Elliptical ROI
      </Button>
      <Button variant="outlined" color="secondary" fullWidth={true} className={classes.button}>
        Reset
      </Button>
    </div>
  );
}

CornestoneOptionsButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CornestoneOptionsButtons);