import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from 'cornerstone-tools';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

export class DownloadImageButton extends React.Component {
  componentWillMount() {
    cornerstoneTools.external.cornerstone = cornerstone;
  }
  constructor(props) {
    super(props);
    this.downloadImage = this.downloadImage.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <Tooltip title="Save as PNG">
        <Button variant="contained" color="default" component="span" className={classes.button} onClick={this.downloadImage} aria-label="Save as PNG">
          <SaveIcon/>
        </Button>
      </Tooltip>
    );
  }
  downloadImage() {
    const element = document.getElementById('corn-image');
    cornerstoneTools.saveAs(element, this.props.fileName.replace(" ", "").split(".")[0]);
    return false;
  }
}

DownloadImageButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

DownloadImageButton.defaultProps = {
  fileName: "Image"
}

export default withStyles(styles)(DownloadImageButton);