import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from "cornerstone-math";
import Hammer from 'hammerjs';  
import Helper from '../Helper';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
  },
  title: {
    marginBottom: 16,
  }
});

const helper = new Helper();

const ToolType = {
  ['wwwc']: {
    browserName: 'wwwc',
    mobileName: 'wwwcTouchDrag',
    mouseButton: 1
  },
  ['pan']: {
    browserName: 'pan',
    mobileName: 'panTouchDrag',
    mouseButton: 3
  },
  ['zoom']: {
    browserName: 'zoom',
    mobileName: 'zoomTouchDrag',
    mouseButton: 5
  },
  ['length']: {
    browserName: 'length',
    mobileName: 'lengthTouch',
    mouseButton: 1
  },
  ['ellipticalRoi']: {
    browserName: 'ellipticalRoi',
    mobileName: 'ellipticalRoiTouch',
    mouseButton: 1
  },
}

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
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool(ToolType['wwwc']);}}>
          Contrast
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool(ToolType['pan']);}}>
          Pan
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool(ToolType['zoom']);}}>
          Zoom
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool(ToolType['length']);}}>
          Length
        </Button>
        <Button variant="outlined" color="primary" fullWidth={true} className={classes.button} onClick={() => {this.enableTool(ToolType['ellipticalRoi']);}}>
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
    helper.desactivateTools(element);
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

  enableTool(toolNameOption) {
    let element = document.getElementById('corn-image');
    helper.activateTool(toolNameOption, element);
  }

  clearImage() {
    let element = document.getElementById('corn-image');
    helper.desactivateTools(element);
    let toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;
    // Note that this only works on ImageId-specific tool state managers (for now)
    toolStateManager.clear(element);
    cornerstone.updateImage(element);
  }
}

CornestoneOptionsButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CornestoneOptionsButtons);