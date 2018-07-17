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
		let element = document.querySelector(".cornerstone-canvas");
		let fullscreenFunc = element.requestFullscreen;
		if (!fullscreenFunc) {
			['mozRequestFullScreen',
			'msRequestFullscreen',
			'webkitRequestFullScreen'].forEach((req) => {
				if(element)
					fullscreenFunc = fullscreenFunc || element[req];
			});
		}

		fullscreenFunc.call(element);
		// set the canvas to 100% width/height
		element.style.width = "100%";
        element.style.height = "100%";
	}

}
export default FullScreenButton;