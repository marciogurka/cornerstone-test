import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import HelpDialog from '../HelpDialog/HelpDialog';
import './AppToolbar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

export class AppToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    }
    this.handleClose = this.handleClose.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit" className="app-title">
              react-cornerstone-app
              <Tooltip title="See the source on Github">
                <a href="https://github.com/marciogurka/react-cornerstone-app" target="_blank" rel="noopener noreferrer" aria-label="See the source on Github">
                  <svg height="25" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                </a>
              </Tooltip>
            </Typography>
            <Tooltip title="Help">
              <IconButton color="inherit" aria-label="Help" onClick={() => {this.setState({openDialog: true})}}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <HelpDialog openDialog={this.state.openDialog} handleClose={this.handleClose}/>
      </div>
    );
  }
  handleClose() {
    this.setState({
      openDialog: false
    });
  }
}

AppToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppToolbar);
