import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
class BaseComponent extends Component {
    constructor(props) {
        super(props);
        BackAndroid.addEventListener('hardwareBackPress',  ()=> {
            this.props.nav.pop();
            return true;
        });
    }
}
export default  BaseComponent;
