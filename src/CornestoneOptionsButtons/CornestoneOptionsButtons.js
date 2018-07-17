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
  }
  dicomImage = null;
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
        <Button variant="outlined" color="secondary" fullWidth={true} className={classes.button} onClick={this.resetImage}>
          Reset
        </Button>
      </div>
    );
  }

  componentDidMount(){
    this.dicomImage = document.getElementById('corn-image');
  }

  resetImage() {
    let element = document.getElementById('corn-image');
    cornerstone.reset(element);
  }

  enableTool(toolName, mouseButtonNumber) {
    this.disableAllTools();
    let element = document.getElementById('corn-image');
    cornerstoneTools[toolName].activate(element, mouseButtonNumber);
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