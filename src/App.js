/**
 * Created
 */

import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
    BackAndroid,
    ToastAndroid,
} from 'react-native';
// import {Navigator} from 'react-native-deprecated-custom-components';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import TabNavigatorBox from './pages/TabNavigatorBox'
import Home from './pages/Home';

// export default class App extends Component{
// 	render(){
// 		return(
// 			<Home/>
// 		)
// 	}
	// componentWillMount() {

	//     if (Platform.OS === 'android') {
	//       BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
	//       // BackAndroid.addEventListener('sss',this.onBackAndroid,true);
	//     }
	//   }
	// componentWillUnmount() {
	//     if (Platform.OS === 'android') {
	//       BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
	//     }
	//   }

	// onBackAndroid = () => {
	//     const navigator = this.refs.navigator;
	//     const routers = navigator.getCurrentRoutes();
	//     console.log(routers)
	//     console.log('当前路由长度：' + routers.length);
	//     console.log(this.props.state.backButtonEnabled)
	//     if (routers.length > 1) {
	//       navigator.pop();
	//       return true;//接管默认行为
	//     } else {

	//       //到了主页了
	//       if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
	//         //最近2秒内按过back键，可以退出应用。
	//         return false;
	//       }
	//       this.lastBackPressed = Date.now();
	//       ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
	//       return true;
	//     }
	//     // return false;//默认行为

	// };
	// render(){
	// 	let defaultName = 'Home';
	//     let defaultComponent = Home;
	//     return (
	//       <Navigator
	//         initialRoute={{ name: defaultName, component: defaultComponent }}
	//         //配置场景
	//         ref="navigator"
	//         configureScene=
	//         {
	//           (route) => {

	//             //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

	//             return Navigator.SceneConfigs.FloatFromRight;
	//           }
	//         }
	//         renderScene={
	//           (route, navigator) => {
	//             let Component = route.component;
	//             return <Component {...route.params} navigator={navigator} />
	//           }
	//         } />
	//     );
	// }
// }










const RouteConfig = {
	TabNavigatorBox:{
		screen:TabNavigatorBox,
		navigationOptions:({navigation}) => ({
			header:null,
			title:'TabNavigatorBox'
		})
	}
}
const StackNavigatorConfig = {
	initialRouteName: 'TabNavigatorBox',
	initialRouteParams: {initPara: '初始页面参数'},
	navigationOptions: {
		header: null,
		title: '标题',
		headerTitleStyle: {fontSize: 18, color: '#666666'},
		headerStyle: {height: 48, backgroundColor: '#fff'},
	},
	paths: 'pages/TabNavigatorBox',
	mode: 'card',
	headerMode: 'screen',
	cardStyle: {backgroundColor: "#ffffff"},
	transitionConfig: (() => ({
		screenInterpolator: CardStackStyleInterpolator.forHorizontal,
	})),
	onTransitionStart: (() => {
		//('111')
	}),
	onTransitionEnd: (() => {
		///(JSON.stringify(this))
	}),
};

export default App = StackNavigator(RouteConfig,StackNavigatorConfig);
