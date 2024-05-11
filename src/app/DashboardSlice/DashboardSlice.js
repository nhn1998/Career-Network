import { createSlice } from "@reduxjs/toolkit";

const EmployeeSlice = createSlice({
    name:"employe",
    initialState:{
        state:false
    },
    reducers:{
        onclickdrawerbutton:(state)=>{
            state.state = !state.state
        },
        onlyDrawerClick:(state)=>{
            state.state = false
        }
    }
})

const {reducer ,actions}=EmployeeSlice
export const {onclickdrawerbutton,onlyDrawerClick}=actions
export default reducer
