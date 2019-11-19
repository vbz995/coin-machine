import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'
const initState ={
        value: "",
        machine:[5,2,1,0.5,0.2,0.1],
        numberOfCoins:{'5':0, '2':0, '1':0, '0.5':0, '0.2':0, '0.1':0 }
}
const exchange=(state, action)=>{
    
    let machine ={...state.machine}
    let coins={...state.numberOfCoins}
    let amount=state.value
    let number=0
    Object.values(coins).forEach(amounts=>{
        amounts=parseInt(amount/machine[number])
        amount=(amount%machine[number]).toFixed(1)
        coins[machine[number]]=amounts
        number++
        
    })    

   return(updateObject(state,{numberOfCoins:coins}))
   
}
const reset=(state,action)=>{
   let coins={...state.numberOfCoins}
   Object.keys(coins).map(coin=>{
       return coins[coin]=0
   })    
return(updateObject(state,{value:"", numberOfCoins:coins }))}

const getRandomValue=(state, action)=>{
    const values=(Math.random()*1000).toFixed(1)
    return(updateObject(state, {value:values}))
}
const getInputValue=(state,action)=>{
    return(updateObject(state,{value:action.value}))
     
}

const reducer = (state=initState,action)=>{
    switch(action.type){
        case actionTypes.EXCHANGE:
           return exchange(state,action)
        case actionTypes.RESET:
           return reset(state,action)
        case actionTypes.RANDOM_VALUE:
            return getRandomValue(state,action)
        case actionTypes.INPUT_VALUE:
            return getInputValue(state,action)   
        default:
            return state
    }}
export default reducer