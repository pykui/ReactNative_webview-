/**
 * Created 
 */
'use strict';
import React, { Component } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	View,
	Platform,
	ScrollView,
} from 'react-native';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker'
import { QRScannerView } from 'ac-qrcode'
let { width, height } = Dimensions.get('window');

export default class CameraBox extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading:false,
			avatarSource: null,
			videoSource: null,
			sideos:null,
			photos:null,
			visibleQR:false

		}
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
						<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
							{
								this.state.avatarSource === null ? <Text>选择图片</Text> :
								<Image style={styles.avatar} source={this.state.avatarSource} />
							}
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
						<View style={[styles.avatar, styles.avatarContainer]}>
							<Text>选择视频</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.selectQRScanner.bind(this)}>
						<View style={[styles.avatar, styles.avatarContainer]}>
							<Text>扫描二维码</Text>
						</View>
					</TouchableOpacity>
					{
						this.state.videoSource &&
						<Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
					}
					{
						this.state.photos &&
						<Text style={{margin: 8, textAlign: 'center'}}>{this.state.photos}</Text>
					}
					{
						this.state.sideos &&
						<Text style={{margin: 8, textAlign: 'center'}}>{this.state.sideos}</Text>
					}
				</ScrollView>
				{this.state.visibleQR?<View style={{position:'absolute',top:0,left:0,width:width,height:height,zIndex:99,backgroundColor:'rgba(0,0,0,.1)'}}>
					<QRScannerView
						onScanResultReceived={this.barcodeReceived.bind(this)}
						renderTopBarView={() => this._renderTitleBar()}
						renderBottomMenuView={() => this._renderMenu()}
					/>
				</View>:null}
			</View>
		);
	}

	selectQRScanner(){
		this.setState({
			visibleQR:true
		})
	}

	_renderTitleBar(){
		return(
			<Text
				style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
			>Here is title bar</Text>
		);
	}

	_renderMenu() {
		return (
			<Text
				style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
			>Here is bottom menu</Text>
		)
	}

	barcodeReceived(e) {
		this.setState({
			visibleQR:false
		})
		alert('Type: ' + e.type + '\nData: ' + e.data);
		//console.log(e)
	}


	selectPhotoTapped() {
		const options = {
			title: '选择图片',
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '拍照',
			chooseFromLibraryButtonTitle: '图片库',
			cameraType: 'back',
			mediaType: 'photo',
			videoQuality: 'high',
			durationLimit: 10,
			maxWidth: 500,
			maxHeight: 500,
			aspectX: 2,
			aspectY: 1,
			quality: 1,
			angle: 0,
			allowsEditing: false,
			noData: false,
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);
			if (response.didCancel) {
				this.setState({
					photos:JSON.stringify(response)
				})
				console.log('User cancelled photo picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let source = { uri: response.uri };
				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				this.setState({
					avatarSource: source
				});
			}
		});
	}

	selectVideoTapped() {
		const options = {
			title: 'Video Picker',
			takePhotoButtonTitle: 'Take Video...',
			mediaType: 'video',
			videoQuality: 'medium'
		};

		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);
			if (response.didCancel) {
				this.setState({
					sideos:JSON.stringify(response)
				})
				console.log('User cancelled video picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				this.setState({
					videoSource: response.uri
				});
			}
		});
	}

	showImagePicker() {
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else {
				let source;
				if (Platform.OS === 'android') {
					source = {uri: response.uri, isStatic: true}
				} else {
					source = {uri: response.uri.replace('file://', ''), isStatic: true}
				}
				let file;
				if(Platform.OS === 'android'){
					file = response.uri
				}else {
					file = response.uri.replace('file://', '')
				}
				this.setState({
					loading:true
				});
				this.props.onFileUpload(file,response.fileName||'未命名文件.jpg')
					.then(result=>{
						this.setState({
							loading:false
						})
					})
			}
		});
	}
}
const styles = StyleSheet.create({
	cameraBtn: {
		padding:5
	},
	count:{
		color:'#fff',
		fontSize:12
	},
	fullBtn:{
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#fff'
	},
	countBox:{
		position:'absolute',
		right:-5,
		top:-5,
		alignItems:'center',
		backgroundColor:'#34A853',
		width:16,
		height:16,
		borderRadius:8,
		justifyContent:'center'
	},


	container: {

		flex: 1,

		justifyContent: 'center',

		alignItems: 'center',

		backgroundColor: '#F5FCFF'

	},

	avatarContainer: {

		borderColor: '#9B9B9B',

		borderWidth: 1,

		justifyContent: 'center',

		alignItems: 'center'

	},

	avatar: {

		borderRadius: 50,

		width: 100,

		height: 100

	}

});
