import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

function UploadImageButton(props) {
  const { classes } = props;
  return (
    <Button variant="contained" color="default" className={classes.button}>
      Upload
      <CloudUploadIcon className={classes.rightIcon} />
    </Button>
  );
}

UploadImageButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadImageButton);