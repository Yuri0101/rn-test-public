
import React, { Component } from 'react';
import {Platform,StyleSheet,Text,TouchableOpacity,ScrollView,
  View
} from 'react-native';
import {h,w,hh,ww,s,lp} from './app/styles';
lp();


export default class App extends Component{
	constructor(props){
		super(props);
	
	}
	state={
		text:'',
		data:[],
		a:[],
		rand:[],
		show:true,
	}
	start(){
		this.state.show=false;
		this.state.a=[];
		this.state.data=[];
		const ur='https://opentdb.com/api.php?amount=10';
		let data;
		fetch(ur)
		.then((response) => response.json())
		.then((responseJson) => {
			data=responseJson;
			//alert(Json.stringify(data));
			let d=data.results;
			for(let i=0;i<d.length;i++){
				this.state.rand[i]=Math.floor(Math.random()*(d[i].incorrect_answers.length+1));
			}
			
			this.setState({data:data.results});
		})
		.catch((error) => {
			alert(error);
		});
	}
	confirmView(){
		let d=this.state.data,v=[],tps=['category','type','difficulty','question','correct_answer','incorrect_answers'];
		for(let j=0;j<d.length;j++){
			let inner=[];
			for(let i=0;i<tps.length-2;i++){
				inner.push(
					<View key={i} style={{flexDirection:'row'}}>
						<Text style={{flex:1,fontSize:4*w,color:'red',borderRightWidth:1,borderBottomWidth:1,borderColor:'#f00'}}>{tps[i]}&nbsp;</Text>
						<Text style={{flex:3,fontSize:4*w,color:'blue',textAlign:'left',borderBottomWidth:1}}>{d[j][tps[i]]}</Text>
					</View>
				);
			}
			
			let answ=[];
			answ[0]=<TouchableOpacity key={0} style={{flex:1,padding:w,margin:w,
			backgroundColor:(this.state.a[j]!==undefined && this.state.a[j]===0)?'#77f':'#faa',borderRadius:5*w}}
					onPress={()=>{
						this.state.a[j]=0;
						this.setState({});
					}}>
					<Text style={{fontSize:3*w,color:'#000',textAlign:'center'}}>{d[j].correct_answer}</Text>
				</TouchableOpacity>;
				for(let i=0;i<d[j].incorrect_answers.length;i++){
					answ.push(
					<TouchableOpacity key={i+1} style={{flex:1,padding:w,margin:w,
					backgroundColor:(this.state.a[j]!==undefined && this.state.a[j]===i+1)?'#77f':'#faa',borderRadius:5*w}}
						onPress={()=>{
							this.state.a[j]=i+1;
							this.setState({});
						}}>
						<Text style={{fontSize:3*w,color:'#000',textAlign:'center'}}>{d[j].incorrect_answers[i]}</Text>
					</TouchableOpacity>
					);
				}
				let r=answ[this.state.rand[j]];
				answ[this.state.rand[j]]=answ[0];
				answ[0]=r;
		
			v.push(
				<View key={j} style={{borderWidth:w,borderColor:'#f00',borderRadius:2*w,margin:w}}>
					{inner}
					<View key={'i'+j} style={{flexDirection:'row'}}>{answ}</View>
				</View>
			);
		}
		let vse=0,ochki=0,pravilnoN=0;
		for (let i=0;i<d.length;i++){
			if(this.state.a[i]!==undefined){
				vse++;
				if(this.state.a[i]===0){
					pravilnoN++;
					switch(d[i].difficulty){
						case 'easy':ochki+=1;
						break;
						case 'medium':ochki+=2;
						break;
						case 'hard':ochki+=3;
						break;
					}
					
				}
			}
		}
		if(vse===d.length && this.state.data.length>0){
			return <View>
			<TouchableOpacity style={{padding:3*w,margin:3*w,backgroundColor:'#5aa',borderRadius:5*w}}
						onPress={()=>{
							this.start();
						}}>
						<Text style={{fontSize:7*w,color:'#000',textAlign:'center'}}>Play Again</Text>
			</TouchableOpacity>
			<Text style={{margin:2*w,padding:2*w,backgroundColor:'#aaa',color:'#a00'}}>
			You have {pravilnoN} right answers, and {(d.length-pravilnoN)} wrong answers
			</Text></View>
		}else{
			return v;
		}
		
		
	}
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}} onLayout={()=>{lp();this.setState({})}}>
		  {(this.state.show)?<TouchableOpacity style={{padding:3*w,margin:3*w,backgroundColor:'#5aa',borderRadius:5*w}}
						onPress={()=>{
							this.start();
						}}>
						<Text style={{fontSize:7*w,color:'#000',textAlign:'center'}}>Start Quiz</Text>
		  </TouchableOpacity>:null}
			
		<ScrollView>
			{this.confirmView()}
		</ScrollView>
      </View>
    );
  }
}

