/**
 * Created by 
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	Alert,
	WebView,
	Text,
	Image,
	TouchableOpacity,
	Platform,
	ScrollView,
	TouchableHighlight,
	BackAndroid
} from 'react-native';
// import Header from '../components/Header';
// import SwiperClassic from '../components/SwiperClassic';
import BaseComponent from'./BaseComponent';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker'
import { QRScannerView } from 'ac-qrcode'
import {Navigator} from 'react-native-deprecated-custom-components';
let { width, height } = Dimensions.get('window');
var WEB_VIEW_REF = 'webview';
export default class Home extends Component {
	constructor(props){
		super(props);
		this.postMessage = this.postMessage.bind(this);
		this.addBackAndroidListener(this.props.navigator);
		this.data = 0;
		this.state = {
			swiperShow:false,
			animated: true,
			hidden: true,//true为蕴藏
			showHideTransition: 'fade',
			routerInfo:'',
			loading:false,
			avatarSource: null,
			videoSource: null,
			sideos:null,
			photos:null,
			visibleQR:false,
			webViewData: '',
			typeX:'',
			url:'http://192.168.2.140:9000',
			textNull:'',
			scalesPageToFit: false,
		};
	}



	// 渲染头部菜单
    _renderTitleBar(){
		return(
			<View>
				<View  style={{height:40,backgroundColor:'rgba(0, 0, 0, 0.3)',paddingTop:10,paddingLeft:15,flexDirection:'row',display:'flex'}}>
					<TouchableOpacity onPress={this.onScanResultReceived.bind(this)} style={{width:40}}><Image style={{width:20,height:20}} source={require('../images/beam_back.png')}/></TouchableOpacity>
					<Text style={{color:'white', textAlign:'center',fontSize:20,flex:1}}
					>扫一扫</Text>
					<View style={{width:40}}><Text>{this.state.textNull}</Text></View>
				</View>
				
			</View>
		);
	}

	_renderMenu() {
		return (
			<Text
				style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
			></Text>
		)
	}

	onScanResultReceived(e) {
		this.setState({
			visibleQR:false,
			typeX:'Type: ' + e.type + '\nData: ' + e.data,
		})
		
		// console.info('Type: ' + e.type + '\nData: ' + e.data);
		//console.log(e)
	}



    sendMessage() {
        this.refs.webview.postMessage(++this.data);
        alert(this.state.typeX)
    }

    scan(e) {
        this.setState({webViewData: e.nativeEvent.data}); 
        this.setState({
			visibleQR:true
		});
		const { navigate } = this.props.navigation;

    }

	postMessage(action) {
    	this.WebView.postMessage(JSON.stringify(action))
    }
    
    // 照相
	selectPhotoTapped=()=> {
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
        		this.refs.webview.postMessage(response.data);
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
	// clickFunc
    clickFunc =(e)=>{
    	console.log(e.nativeEvent.data);
    	switch(e.nativeEvent.data){
    		case "scan":
    			this.scan(e);
    			break;
    		default:
    			this.selectPhotoTapped();
    	}
    };

    goBack = () => {
        this.refs[WEB_VIEW_REF].goBack();
    };
    // 监听返回键事件
    addBackAndroidListener(navigator) {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = ()=> {
        if (this.state.backButtonEnabled) {
            this.refs[WEB_VIEW_REF].goBack();
            return true;
        } else {
            return false;
        }
    };
    onNavigationStateChange = (navState)=> {
        this.setState({
            backButtonEnabled: navState.canGoBack,
        });
    };
	render() {
		return (
			<View style={styles.container}>
				<WebView
					ref={WEB_VIEW_REF}
					onNavigationStateChange={this.onNavigationStateChange}
					bounces={false}
			        source={{uri:this.state.url}}
			        onMessage={(e) => {this.clickFunc(e)}}
			        scalesPageToFit={this.state.scalingEnabled}
			    />
			    {this.state.visibleQR?<View  style={{position:'absolute',top:0,left:0,width:width,height:height,zIndex:99,backgroundColor:'rgba(0,0,0,.1)'}}>
					<QRScannerView
						
						onScanResultReceived={this.onScanResultReceived.bind(this)}
						renderTopBarView={() => this._renderTitleBar()}
						renderBottomMenuView={() => this._renderMenu()}
					/>
				</View>:null}	
			</View>
		);
	}

	componentDidMount(){
		setTimeout(()=>{
			this.setState({
				swiperShow:true
			});
		},0)
		this.setState({
			routerInfo:JSON.stringify(this.props.navigation)
		})
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'rgba(0,0,0,.1)'
	},
	swiper:{
		flex:1,
		height:200
	},
	list03:{
		paddingTop:5,
		paddingBottom:5
	},
	autoHeight:{
		flex:1,
		minHeight:300,
		maxHeight:30000
	}
})