import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CornestoneImage } from '../CornestoneImage/CornestoneImage';
import UploadImageButton from '../UploadImageButton/UploadImageButton';
import FullScreenButton from '../FullScreenButton/FullScreenButton';
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
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '75vh'
  },
  title: {
    flexGrow: 1,
    marginBottom: 16,
    textAlign: 'left'
  }
});

export class AppContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: ""
    }
    this.onFileImageLoaded = this.onFileImageLoaded.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={9}>
            <Paper className={classes.dicomContainer}>
              <div className="row-image-title">
                <Typography variant="headline" component="h5" className={classes.title}>
                Image{this.state.fileName}
                </Typography>
                <div className="row-center">
                  <FullScreenButton/>
                  <UploadImageButton onFileImageLoaded={this.onFileImageLoaded}/>
                </div>
              </div>
              <CornestoneImage/>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <CornestoneOptionsButtons/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
  onFileImageLoaded(fileName) {
    this.setState({fileName: `: ${fileName}`});
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppContent);