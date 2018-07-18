import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from "cornerstone-math";
import Hammer from 'hammerjs';  
import { isMobile } from "react-device-detect";

export class Helper {
	constructor() {
		cornerstoneTools.external.cornerstone = cornerstone;
	    cornerstoneTools.external.Hammer = Hammer;
	    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
	}

	activateDefaultTools(element) {
		if (isMobile)
			this.activateMobileTools(element);
		else
			this.activateBrowserTools(element);
	}

	activateTool(toolNameOption, element) {
		this.desactivateTools(element);
		if (isMobile) {
			cornerstoneTools[toolNameOption.mobileName].activate(element);
		} else {
			cornerstoneTools[toolNameOption.browserName].activate(element, toolNameOption.mouseButton);
		}
	}

	activateMobileTools(element) {
		const configuration = {
	        testPointers: (eventData) => {
	            return (eventData.numPointers >= 3);
	        }
	    };
	    cornerstoneTools.panMultiTouch.setConfiguration(configuration);
        cornerstoneTools.touchInput.enable(element);
        cornerstoneTools.zoomTouchPinch.activate(element);
        cornerstoneTools.wwwcTouchDrag.activate(element);
        cornerstoneTools.panMultiTouch.activate(element);
	}

	activateBrowserTools(element){
        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);
        cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
        cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
	}

	desactivateTools(element){
		if (isMobile) {
	        cornerstoneTools.wwwcTouchDrag.deactivate(element);
	        cornerstoneTools.lengthTouch.deactivate(element);
	        cornerstoneTools.ellipticalRoiTouch.deactivate(element);
	        cornerstoneTools.zoomTouchDrag.deactivate(element);
	        cornerstoneTools.panTouchDrag.deactivate(element);
		} else {
			cornerstoneTools.wwwc.disable(element);
		    cornerstoneTools.pan.activate(element, 2); // 2 is middle mouse button
	    	cornerstoneTools.zoom.activate(element, 4); // 4 is right mouse button
		    cornerstoneTools.length.deactivate(element, 1);
		    cornerstoneTools.ellipticalRoi.deactivate(element, 1);
		}
	}
}

export default Helper;