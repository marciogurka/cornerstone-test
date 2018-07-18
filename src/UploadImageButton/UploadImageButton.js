import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from 'cornerstone-tools';
import * as dicomParser from 'dicom-parser';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

export class UploadImageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      onFileImageLoaded: (file) => {}
    };
    this.sendFile = this.sendFile.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    let config = {
        webWorkerPath : './cornerstoneWADOImageLoaderWebWorker.js',
        taskConfiguration: {
            'decodeTask' : {
                codecsPath: './cornerstoneWADOImageLoaderCodecs.js'
            }
        }
    };
    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <input
          accept="application/dicom"
          className={classes.input}
          id="dicom-image-file"
          type="file"
          onChange={this.sendFile}
        />
        <label htmlFor="dicom-image-file">
          <Button variant="contained" color="default" component="span" className={classes.button}>
            Upload Image
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </label>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            onClose={this.handleClose}
            message="An error occurred in the file upload"
          />
        </Snackbar>
        
      </div>
    );
  }
  sendFile(e) {
    const file = e.target.files[0];
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    this.loadAndViewImage(imageId, file.name);
  }
  handleClose(event, reason) {
    this.setState({ open: false });
  }
  loadAndViewImage(imageId, fileName) {
        const element = document.getElementById('corn-image');
        cornerstone.enable(element);
        cornerstone.loadImage(imageId).then((image) => {
            this.props.onFileImageLoaded(fileName);
            const viewport = cornerstone.getDefaultViewportForImage(element, image);
            cornerstone.displayImage(element, image, viewport);
            element.style.width = "100%";
            element.style.height = "100%";
            cornerstoneTools.mouseInput.enable(element);
            cornerstoneTools.mouseWheelInput.enable(element);
            cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
            cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
            cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
            cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
        }, (err) => {
            this.setState({open: true});
            console.error(err);
        });
    }
    
}

UploadImageButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadImageButton);