import React from 'react'
import {randomValue, exchange, reset, inputValue, inputCoin, updateStateCoins} from '../actions/index'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'
import {Row, Button, ListGroup, Form, Image,  ButtonGroup} from 'react-bootstrap'
let coin, numberCoins;
const Cont=styled(Form)`
height:100%
background-color: rgb(210, 223, 30);
background-position: 100%

`

const Images = styled(Image)`
width:50px
height: 50px
`
const Title = styled.h1`
text-shadow: 3px 2px gray
color:blue
font-family: Comic Sans MS, Comic Sans, cursive
`
class Forms extends React.Component{
 
    render()
    { 
        return <Cont>
            
            <Row className="justify-content-md-center">
                <Images src={require("../images/coins.jpg")}></Images>
                <Title>COIN MACHINE</Title>
                <Images src={require("../images/coin2.jpg")}></Images>
            </Row>
            <Form className="mt-5 mb-5">
                <label>Enter coin value: </label>
                <input id="coin" min="0.1" type="number" step=".1" 
                onChange={e=>{e.preventDefault()
                    coin=e.target.value
                        }}>
                </input>
                <label className="ml-3">Enter number of coin: </label>
                <input id="numberCoin"  type="number" min="1"  onChange={
                    e=>{e.preventDefault()
                    numberCoins=e.target.value
            }}></input>
                <Button className="ml-3" type="button" onClick={()=>{this.props.InputCoin(coin,numberCoins)}}>ADD COIN</Button>
                <br/><label>Coins: </label><br/>
                <ListGroup horizontal>
                        {Object.values(this.props.machine).map(coin=>
                            <ListGroup.Item key={coin} variant="secondary"> Number of coin {coin}: {this.props.startStateCoins[coin]} </ListGroup.Item>)}
               </ListGroup>
                </Form>

            <Form className="mt-5 mb-5">
                <label >Enter your amount:</label>
                <input className="mr-5" type="number" min='0'  step='.1' placeholder="Enter your amount" value={this.props.value}  onChange={e=>
                {
                    e.preventDefault()
                     this.props.InputValue(e.target.value)
                }}>
                </input>
                <label className="mr-2">Random amount:</label>
                <Button type='button' className="btn" onClick={this.props.RandomValue}>Random amount</Button><br/>
                <ButtonGroup className="mt-2 mb-5">
                    <Button variant="dark" type='button' className="btn mr-2" onClick={this.props.Exchange}>Exchange</Button>
                    <Button variant="dark" type='button' className="btn  ml-2" onClick={this.props.Reset}>Reset</Button>
                </ButtonGroup>
               <br/> <label>Choose one option: </label><br/>
               <ListGroup key='xl' className="mt-3">
                        {this.props.solutions.map(sol=>
                            <ListGroup.Item  onClick={()=>{
                               alert("You choose:"+sol.map(([key, value])=>" Coins "+ key + ": " + value))
                               sol.map(([key, value])=>this.props.UpdateStateCoins(key, value))
                               
                            }} variant="info"> {sol.map(([key, value])=>"Coins "+ key + ": " + value + "; ")} </ListGroup.Item>
                        )}
               </ListGroup>
                
                        
               </Form>    
        </Cont>
                
    }
  

    

    
}
const mapStateToProps = state =>{
    return{
        value:state.coins.value,
        machine:state.coins.machine,
        numberOfCoins:state.coins.numberOfCoins,
        startStateCoins:state.coins.startStateCoins,
        solutions:state.coins.solutions
    }
   
}
const mapDispatchToProps = dispatch => {
    return {
        RandomValue: (value) => dispatch( randomValue(value) ),
        InputValue: (value) => dispatch( inputValue(value) ),
        Exchange: (value) => dispatch( exchange(value) ),
        Reset:(value)=>dispatch(reset(value)),
        InputCoin:(coinValue, numberCoin) => dispatch(inputCoin(coinValue,numberCoin)),
        UpdateStateCoins:(key,value)=>dispatch(updateStateCoins(key, value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Forms)
