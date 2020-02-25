import React from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,} from 'react-native';
import {  Button, Header, Left, Body, Right, Title, Container, List, Row, Col } from 'native-base';
import {ListItem} from 'react-native-elements'

const serverCanciones = "http://45.236.130.226/audio/";
export default class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			archivos: null,
			path: ""
		}
	}


	componentDidMount(){
		this.getData()
	}

	getData = async (item = "") => {
		try{
			console.log('item', item)
			let data
			if(item == ""){
				data = await fetch("http://45.236.130.226/audio/list.php")
			}else{
				let formulario = new FormData()
				
				console.log(this.state.path)
				let aux
				if(this.state.path){
					await this.setState({path: this.state.path+"/"+item})
				}else{
					await this.setState({path: item})
				}
				
				formulario.append('path', this.state.path)
				data = await fetch("http://45.236.130.226/audio/list.php", {body: formulario, method:'post'})
			}
			let arr = await data.json() 
			await this.setState({archivos: arr})
			console.log(this.state)
		}catch(e){
			console.log(e) 
		}
	}

	play = cancion => {
		let url = serverCanciones + this.state.path + "/" + cancion
		try{
			var Sound = require('react-native-sound');
			const track = new Sound(url, null, (e) => {
			if (e) {
				console.log('error loading track:', e)
			} else {
				track.play()
				track.setVolume(1)
				console.log('asd', track.getDuration())
			}
			})
		}catch(e){
			console.log(e)
		}
		console.log(url)
	}

    render(){
    	return(
			<View>
				<View style={{height: 300}}>
					<Row>
						<Col style={{height:150}}>
							<Text>klhlk</Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button rounded style={{display: 'flex', justifyContent:'center', marginRight: 20, marginLeft: 20}}>
								<View style={{width: '100%'}}><Text style={{color: 'white', alignSelf: 'center'}}>Play</Text></View>
							</Button>
						</Col>
						<Col>
							<Button rounded style={{display: 'flex', justifyContent:'center', marginRight: 20, marginLeft: 20}}>
								<View style={{width: '100%'}}><Text style={{color: 'white', alignSelf: 'center'}}>Pause</Text></View>
							</Button>
						</Col>
						<Col>
							<Button rounded style={{display: 'flex', justifyContent:'center', marginRight: 20, marginLeft: 20}}>
								<View style={{width: '100%'}}><Text style={{color: 'white', alignSelf: 'center'}}>Stop</Text></View>
							</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button rounded style={{display: 'flex', justifyContent:'center', marginRight: 20, marginLeft: 20}}>
								<View style={{width: '100%'}}><Text style={{color: 'white', alignSelf: 'center'}}>Prev</Text></View>
							</Button>
						</Col>
						<Col>
							<Button rounded style={{display: 'flex', justifyContent:'center', marginRight: 20, marginLeft: 20}}>
								<View style={{width: '100%'}}><Text style={{color: 'white', alignSelf: 'center'}}>Off</Text></View>
							</Button>
						</Col>
						<Col>
							<Button rounded style={{display: 'flex', justifyContent:'center', marginRight: 20, marginLeft: 20}}>
								<View style={{width: '100%'}}><Text style={{color: 'white', alignSelf: 'center'}}>Next</Text></View>
							</Button>
						</Col>
					</Row>
				</View>
				<ScrollView style={{height: '100%'}}>
					{
						this.state.archivos?
						this.state.archivos.carpetas.map((ele, index) => {
							return (
								<ListItem 
									onPress = {() => this.getData(ele.split(' ').join('_'))}
									key = {index}
									title = {ele.split('_').join(' ')}
									bottomDivider
								/>
							)
						})
						:
						null
					}
					{
						this.state.archivos?
						this.state.archivos.canciones.map((ele, index) => {
							return (
								<ListItem 
									onPress = {() => this.play(ele)}
									key = {index}
									title = {ele.split('_').join(' ')}
									bottomDivider
								/>
							)
						}) 
						:
						null
					}
					
				</ScrollView>
			</View>
    	)
    }
}