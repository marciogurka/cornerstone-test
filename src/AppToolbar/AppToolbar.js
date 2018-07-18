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
              Nico.lab's Frond-End Developer  Technical Assignment
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