import {Dimensions} from 'react-native';
export let h,w,hh,ww,s;
//lp();
export function lp(){//landerscape,portrait
	h =Math.max(Dimensions.get('screen').height,Dimensions.get('screen').width)/100;//screen window
	w = Math.min(Dimensions.get('screen').height,Dimensions.get('screen').width)/100;
	hh=Dimensions.get('screen').height/100;
    ww=Dimensions.get('screen').width/100;
	s = {
	c1: '#db3727',
	bg_c1:"backgroundColor:'#db3727' #e7796f  #df4b3d",
	h: {
		flex: 1,
		//justifyContent: 'center',
		//alignItems: 'center',
		//backgroundColor: '#F5FCFF',
	},	
	h_1: {
		fontSize: 10*w,
		textAlign: 'center',
		margin: 10,
	},	
	e1: {
		flex: 1,
		//justifyContent: 'center',
		//alignItems: 'center',
		//backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 10*ww,
		textAlign: 'center',
		margin: 10,
		color:'#fff',
		textShadowColor:'#bd1707',
		textShadowOffset:{width: w,height: w},
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	
	};
}