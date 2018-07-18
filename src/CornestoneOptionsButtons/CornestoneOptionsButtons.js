import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from "cornerstone-math";
import Hammer from 'hammerjs';  

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
  },
  title: {
    marginBottom: 16,
  }
});

export class CornestoneOptionsButtons extends React.Component {
  constructor(props) {
    super(props);
    this.resetImage = this.resetImage.bind(this);
    this.enableTool = this.enableTool.bind(this);
    this.clearImage = this.clearImage.bind(this);
  }
  componentWillMount() {
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="headline" component="h5" className={classes.title}>
          Options
        </Typography>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool("wwwc", 1);}}>
          Contrast
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool("pan", 3);}}>
          Pan
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool("zoom", 5);}}>
          Zoom
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool("length", 1);}}>
          Length
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool("ellipticalRoi", 1);}}>
          Elliptical ROI
        </Button>
        <Button variant="outlined" fullWidth={true} className={classes.button} onClick={this.clearImage}>
          Clear Tools
        </Button>
        <Button variant="outlined" color="secondary" fullWidth={true} className={classes.button} onClick={this.resetImage}>
          Reset
        </Button>
      </div>
    );
  }

  componentDidMount(){
    window.addEventListener("resize", this.onResize);
    window.addEventListener("orientationchange", this.onResize);
  }

  resetImage() {
    let element = document.getElementById('corn-image');
    this.disableAllTools();
    cornerstone.reset(element);
  }

  onResize() {
    let element = document.getElementById('corn-image');
    let container = element.parentElement;
    container.style.width = window.outerWidth;
    container.style.maxHeight = window.outerHeight;
    if (document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement || document.msFullscreenElement) {
          container.style.width = window.outerWidth;
          container.style.maxHeight = window.outerHeight;
          element.style.width = "100%";
          element.style.height = "100%";
    } else {
      element.style.width = container.offsetWidth;
      element.style.height = container.offsetHeight;
      
    }
    cornerstone.resize(element, true);
  }

  enableTool(toolName, mouseButtonNumber) {
    this.disableAllTools();
    let element = document.getElementById('corn-image');
    cornerstoneTools[toolName].activate(element, mouseButtonNumber);
  }

  clearImage(toolName, mouseButtonNumber) {
    this.disableAllTools();
    let element = document.getElementById('corn-image');
    cornerstoneTools.wwwc.activate(element, 2);
    cornerstoneTools.pan.activate(element, 4);
    let toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;
    // Note that this only works on ImageId-specific tool state managers (for now)
    toolStateManager.clear(element);
    cornerstone.updateImage(element);
  }
  // helper function used by the tool button handlers to disable the active tool
  // before making a new tool active
  disableAllTools() {
    let element = document.getElementById('corn-image');
    if(element) {  
      cornerstoneTools.wwwc.disable(element);
      cornerstoneTools.pan.activate(element, 2); // 2 is middle mouse button
      cornerstoneTools.zoom.activate(element, 4); // 4 is right mouse button
      cornerstoneTools.length.deactivate(element, 1);
      cornerstoneTools.ellipticalRoi.deactivate(element, 1);
    }
  }
}

CornestoneOptionsButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CornestoneOptionsButtons);