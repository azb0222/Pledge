import React, {Component} from 'react';
import {View, PanResponder} from 'react-native';

export const swipeDirections = {
    SWIPE_LEFT: 'SWIPE_LEFT',
    SWIPE_RIGHT: 'SWIPE_RIGHT'
};

const swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};

function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
    return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
}

class HGestureRecognizer extends Component {

    constructor(props, context) {
        super(props, context);
        this.swipeConfig = Object.assign(swipeConfig, props.config);
    }

    componentWillReceiveProps(props) {
        this.swipeConfig = Object.assign(swipeConfig, props.config);
    }

    componentWillMount() {
        const responderEnd = this._handlePanResponderEnd.bind(this);
        const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
        this._panResponder = PanResponder.create({ //stop JS beautify collapse
        onStartShouldSetPanResponder: shouldSetResponder,
        onMoveShouldSetPanResponder: shouldSetResponder,
        onPanResponderRelease: responderEnd,
        onPanResponderTerminate: responderEnd
        });
    }

    _handleShouldSetPanResponder(evt, gestureState) {
        return evt.nativeEvent.touches.length === 1 && !this._gestureIsClick(gestureState);
    }
    
    _gestureIsClick(gestureState) {
        return Math.abs(gestureState.dx) < 5;
    }

    _handlePanResponderEnd(evt, gestureState) {
        const swipeDirection = this._getSwipeDirection(gestureState);
        this._triggerSwipeHandlers(swipeDirection, gestureState);
    }

    _triggerSwipeHandlers(swipeDirection, gestureState) {
        const {onSwipe, onSwipeLeft, onSwipeRight} = this.props;
        const {SWIPE_LEFT, SWIPE_RIGHT,} = swipeDirections;
        onSwipe && onSwipe(swipeDirection, gestureState);
        switch (swipeDirection) {
        case SWIPE_LEFT:
            onSwipeLeft && onSwipeLeft(gestureState);
            break;
        case SWIPE_RIGHT:
            onSwipeRight && onSwipeRight(gestureState);
            break;
        }
    }

    _getSwipeDirection(gestureState) {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        const {dx} = gestureState;
        if (this._isValidHorizontalSwipe(gestureState)) {
        return (dx > 0)
            ? SWIPE_RIGHT
            : SWIPE_LEFT;
        } 
        return null;
    }

    _isValidHorizontalSwipe(gestureState) {
        const {vx, dy} = gestureState;
        const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
        return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
    }

    _isValidVerticalSwipe(gestureState) {
        const {vy, dx} = gestureState;
        const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
        return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
    }

    render() {
        return (<View {...this.props} {...this._panResponder.panHandlers}/>);
    }
};

export default HGestureRecognizer;