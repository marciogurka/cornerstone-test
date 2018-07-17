import React from 'react';
import Button from '@material-ui/core/Button';
import Fullscreen from '@material-ui/icons/Fullscreen';

class FullScreenButton extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	render() {
	    return (
	      	<Button color="default" onClick={this.onClick}>
				<Fullscreen />
			</Button>
		);
	}

	onClick() {		
		let fullscreenDiv = document.querySelector(".cornerstone-canvas");
		let fullscreenFunc = fullscreenDiv.requestFullscreen;
		if (!fullscreenFunc) {
			['mozRequestFullScreen',
			'msRequestFullscreen',
			'webkitRequestFullScreen'].forEach((req) => {
				if(fullscreenDiv)
					fullscreenFunc = fullscreenFunc || fullscreenDiv[req];
			});
		}

		fullscreenFunc.call(fullscreenDiv);
	}

}
export default FullScreenButton;