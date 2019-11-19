import React from 'react'
import {randomValue, exchange, reset, inputValue} from '../actions/index'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'
import {Container, Row, Button, ListGroup, Form, Image, FormControl, ButtonGroup} from 'react-bootstrap'

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
        return <Container>
            <Row className="justify-content-md-center">
                <Images src={require("../images/coins.jpg")}></Images>
                <Title>COIN MACHINE</Title>
                <Images src={require("../images/coin2.jpg")}></Images>
             
            </Row>

            <Form className="mt-3">
                <FormControl type="number" min='0'  step='.1' placeholder="Enter your amount" value={this.props.value}  onChange={e=>
                {
                    e.preventDefault()
                     this.props.InputValue(e.target.value)
                }}>
                </FormControl>
                <ButtonGroup className="mt-1" size="lg">
                    <Button type='button' className="btn btn-outline-dark" onClick={this.props.RandomValue}>Random value</Button>
                    <Button type='button' className="btn btn-outline-dark" onClick={this.props.Exchange}>Exchange</Button>
                    <Button type='button' className="btn btn-outline-dark" onClick={this.props.Reset}>Reset</Button>
                </ButtonGroup>
                
                
                <ListGroup className="mt-3">
                        {Object.values(this.props.machine).map(coin=>
                            <ListGroup.Item key={coin} variant="info"> Number of coin {coin}: {this.props.numberOfCoins[coin]} </ListGroup.Item>)}
               </ListGroup>
               </Form>    
        </Container>
                
    }


    
}
const mapStateToProps = state =>{
    return{
        value:state.coins.value,
        machine:state.coins.machine,
        numberOfCoins:state.coins.numberOfCoins
    }
   
}
const mapDispatchToProps = dispatch => {
    return {
        RandomValue: (value) => dispatch( randomValue(value) ),
        InputValue: (value) => dispatch( inputValue(value) ),
        Exchange: (value) => dispatch( exchange(value) ),
        Reset:(value)=>dispatch(reset(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Forms)
