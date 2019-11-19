import * as actionTypes from './actionTypes'


export const randomValue = (value)=>({
        type:actionTypes.RANDOM_VALUE,
        value
})

export const exchange = (value)=>({
    type:actionTypes.EXCHANGE,
    value
})

export const reset = (value)=>({
    type:actionTypes.RESET,
    value
})

export const inputValue =(value)=>({
    type:actionTypes.INPUT_VALUE,
    value
})