import {createContext, ReactNode, useState,useReducer, useEffect } from "react";
import { Cycle, CyclesReducers } from "../reducers/cycles/Reducers";
import { interruptCycleAction, addNewCycleAction, markCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string
    minutesAmount:number
}



interface CyclesContextType{
    cycles: Cycle[]
    activeCycle:Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed:number
    markCurrentCycleAsFinished: () => void
    setSecodsPassed: (seconds:number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCycleCurrentCycle: () => void
    
    
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclecontextProps {
    children: ReactNode
}





export function CyclesContextProvier({children}:CyclecontextProps){

    const [cyclesState,dispatch] = useReducer( CyclesReducers ,{
        cycles:[],
        activeCycleId:null
    }, (initialState) => {
        const storageStateAsJSON = localStorage.getItem('@ignnite-timer:cycles-state-1.0.0')

        if(storageStateAsJSON){
            return JSON.parse(storageStateAsJSON) 
        }

        return initialState
    })
    const {activeCycleId,cycles} = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed,setAmountSecondsPassed] =  useState(() => {
        
        if(activeCycle){
            
            return  differenceInSeconds(
                new Date(), 
                new Date(activeCycle.startDate),
    
            )
        }
        
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignnite-timer:cycles-state-1.0.0' , stateJSON)
    }, [cyclesState])
    


    

    function setSecodsPassed(seconds:number){
        setAmountSecondsPassed(seconds)
    }


    function markCurrentCycleAsFinished(){

        dispatch(markCycleAsFinishedAction())
     


    }


    function createNewCycle(data: CreateCycleData){
            
        const id = String(new Date().getTime())
        
        const newCycle:Cycle ={
                id,
                task : data.task,
                minutesAmount: data.minutesAmount,
                startDate: new Date(),

            }

            dispatch(addNewCycleAction(newCycle))

            
     
            setAmountSecondsPassed(0)
            
          
        }
        
     

    function interruptCycleCurrentCycle(){
        
        dispatch(interruptCycleAction())
       
      
    }



    return (

        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished, amountSecondsPassed,
            setSecodsPassed,
            createNewCycle,
            interruptCycleCurrentCycle

            }}>
                {children}
                
        </CyclesContext.Provider>
    )
}