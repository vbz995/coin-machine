/* eslint-disable use-isnan */
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'
const initState ={
        value: "",
        machine:[],
        startStateCoins:{},
        numberOfCoins:{},
        solutions: []
}
let counter = 0
const calculate =(state, amount, counter, machine, coins,stateCoins, solutions)=>{
   let value
   let newAmount
   const machineLength=machine.length
   if(parseInt(counter)>=parseInt(machineLength))
   {
       return
   }
   let numberCoins=stateCoins[machine[counter]]
   let valueCoins=machine[counter]
  for(let i=0; i<=numberCoins; i++)
  {
     value=i*valueCoins
     newAmount=amount-value
     if(newAmount<0)
     {
         break
     }
     coins[machine[counter]]=i
     calculate(state, newAmount, parseInt(counter+1), machine, coins, stateCoins, solutions)
     if(newAmount===0 && counter===machineLength-1)
     {
         if(solutions.length>4)
         {
             break
         }
         solutions.push(Object.entries(coins))
     }
  }  
}
const exchange=(state, action)=>{
    let coins={...state.numberOfCoins}  
    let stateCoins={...state.startStateCoins}
    let machine =state.machine
    let sumState=0
    let solutions=state.solutions
    let amount=state.value
    machine= Object.values(machine).sort((a,b)=>a-b)
    Object.keys(stateCoins).forEach(value=>{
        sumState=sumState+(stateCoins[value]*value)
    })
    if(sumState<amount)
    {
        alert("Machine don't have enough money!!!!")
    }
    else{
        calculate(state,amount,0, machine, coins, stateCoins, solutions)
        if(solutions.length===0)
        {
            alert("This amount can't change!!!")
        }
    }
    return(updateObject(state,{numberOfCoins:coins, startStateCoins:stateCoins}))
}
const reset=(state,action)=>{
  let solutions=state.solutions
  solutions=[]
return(updateObject(state,{value:"", solutions:solutions}))}

const getRandomValue=(state, action)=>{
    const values=(Math.random()*1000).toFixed(1)
    return(updateObject(state, {value:values}))
}
const getInputValue=(state,action)=>{
    return(updateObject(state,{value:action.value}))
}
const getInputCoin=(state,action)=>{
    let coins={...state.startStateCoins}
    let counterCoins={...state.numberOfCoins}
    let isExist=false
    const stMachine={...state.machine}
    if(action.coinValue === undefined || action.numberCoin ===undefined || isNaN(action.coinValue)===true || isNaN(action.numberCoin)===true ||action.coinValue==="")
    {
        alert("Please enter valid coin value and number of coin")
    }
    else{
        console.log("ENTER COIN VALUE: ",  action.coinValue)
        Object.keys(coins).forEach(coin=>{
            if(coin===action.coinValue){
                coins[coin]= parseFloat(coins[coin])+ parseInt(action.numberCoin)
               return isExist=true
            }
        })
        if(isExist===false)
        {
            stMachine[counter]=action.coinValue
            coins[stMachine[counter]]=parseInt(action.numberCoin)
            counterCoins[stMachine[counter]]=0
            counter++
        }
    }
    return(updateObject(state,{machine:stMachine, startStateCoins:coins, numberOfCoins:counterCoins}))  
}

const updateStateCoins=(state,action)=>{
    let solutions=state.solutions
    const stateCoins={...state.startStateCoins}
    stateCoins[action.key] = parseInt(stateCoins[action.key]) - action.value
    solutions=[]
    return(updateObject(state,{value:"",solutions:solutions, startStateCoins:stateCoins}))
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
        case actionTypes.INPUT_COIN:
            return getInputCoin(state,action) 
        case actionTypes.UPDATE_STATE_COINS:
            return updateStateCoins(state,action)     
        default:
            return state
    }}
export default reducer