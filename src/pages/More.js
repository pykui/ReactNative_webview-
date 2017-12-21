/**
 * Created 
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	Text,
	View,
	Dimensions
} from 'react-native';
let { width, height } = Dimensions.get('window');
export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			routerInfo:''
		}
	}
	render() {
		return (
			<View style={{flex:1,height:height}}>
				<ScrollView>
					<View>
						<Text>
							{this.state.routerInfo}
						</Text>
					</View>
					<View>
						<Text>
							MORE &&MORE
						</Text>
					</View>
					
				</ScrollView>
			</View>
		);
	}

	componentDidMount(){
		this.setState({
			routerInfo:JSON.stringify(this.props.navigation)
		})
	}
}