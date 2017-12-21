/**
 * Created
 */
import React from 'react';
import {Image} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Home from './Home';

const routerConfig = {
	Home:{
		getScreen: () => require('./Home').default,
		//screen:Home,
		paths: 'pages/Home',
		navigationOptions:({navigation}) => ({
			tabBarLabel: '1',
			
		}),		
	}

};

const tabOptionsConfig = {
	animationEnabled: false, // 切换页面时是否有动画效果
	tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
	swipeEnabled: true, // 是否可以左右滑动切换tab
	backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
	tabBarOptions: {
		activeTintColor: '#ff8500', // 文字和图片选中颜色
		inactiveTintColor: '#333', // 文字和图片未选中颜色
		showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
		indicatorStyle: {
			height: 0,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
			backgroundColor:'red'
		},
		/*scrollEnabled: true,*/
		style: {
			backgroundColor: '#f1f1f1', // TabBar 背景色
			height:0,
		},
		labelStyle: {
			fontSize: 14, // 文字大小
		},
	}
}

export default TabNavigatorBox = TabNavigator(routerConfig,tabOptionsConfig);

