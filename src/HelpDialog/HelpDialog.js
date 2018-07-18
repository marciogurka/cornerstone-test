import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class HelpDialog extends React.Component {
	render() {
		if(!this.props.openDialog) {
	      	return null;
	    }
		return (
			<Dialog
			open={this.props.openDialog}
			onClose={this.props.handleClose}
			scroll="paper"
			aria-labelledby="scroll-dialog-title">
				<DialogTitle id="scroll-dialog-title">Hey, let me help you!</DialogTitle>
				<DialogContent>
						<Typography variant="subheading" gutterBottom>
					        Welcome, you can do the following actions in this application:
					    </Typography>
					    <Typography variant="body2" gutterBottom>
							Activation of a tool for the left mouse button:
					    </Typography>
						
						<List dense={true}>
			                <ListItem>
			                    <ListItemText
			                      primary="WW/WC - Adjust the window width and window center of the image (activated by default)"
			                    />
			                </ListItem>
			                <ListItem>
			                    <ListItemText
			                      primary="Pan - Pan the image"
			                    />
			                </ListItem>
			                <ListItem>
			                    <ListItemText
			                      primary="Zoom - Zoom the image"
			                    />
			                </ListItem>
			                <ListItem>
			                    <ListItemText
			                      primary="Length - Length measurement tool"
			                    />
			                </ListItem>
			                <ListItem>
			                    <ListItemText
			                      primary="Elliptical ROI - An elliptical ROI that shows mean, stddev and area"
			                    />
			                </ListItem>
			            </List>
			            <Typography variant="body2" gutterBottom>
							The default tools enabled are:
					    </Typography>
						<List dense={true}>
			                <ListItem>
			                    <ListItemText
			                      primary="Pan by dragging the middle mouse button"
			                    />
			                </ListItem>
			                <ListItem>
			                    <ListItemText
			                      primary="Zoom by dragging the right mouse button"
			                    />
			                </ListItem>
			                <ListItem>
			                    <ListItemText
			                      primary="Zoom by rolling the mouse wheel"
			                    />
			                </ListItem>
			            </List>
			            <Typography variant="body1" gutterBottom>
							Clear tools option remove all the marks that you wrote on the image
					    </Typography>
					    <Typography variant="body1" gutterBottom>
							Reset option remove all the changes that you made in the image
					    </Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.handleClose} color="primary">
					Close
					</Button>
				</DialogActions>
			</Dialog>
			);
	}

	handleClose(){
	    this.setState({ openDialog: false });
	};

}

HelpDialog.defaultProps = {
	openDialog: false
};
export default HelpDialog;