import {createContext, ReactNode, useState } from "react";

interface CreateCycleData {
    task: string
    minutesAmount:number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date

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

    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed,setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecodsPassed(seconds:number){
        setAmountSecondsPassed(seconds)
    }


    function markCurrentCycleAsFinished(){


        setCycles((state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return{ ...cycle,finishedDate : new Date()}
                }else{
                    return cycle
                }
                
            })
        )


    }


    function createNewCycle(data: CreateCycleData){
            
        const id = String(new Date().getTime())
        
        const newCycle:Cycle ={
                id,
                task : data.task,
                minutesAmount: data.minutesAmount,
                startDate: new Date(),

            }

            setCycles((state)  => [...state,newCycle])
        setActiveCycleId(id)
            setAmountSecondsPassed(0)
            
          
        }
        
     

    function interruptCycleCurrentCycle(){
        
        setCycles((state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return{ ...cycle,interruptedDate: new Date()}
                }else{
                    return cycle
                }
                
            }),
        )
        setActiveCycleId(null)
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