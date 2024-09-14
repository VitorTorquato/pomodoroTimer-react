import { HandPalm, Play } from "@phosphor-icons/react";

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';


import { HomeContainer,
    StartCountdownBtn,
    StopCountdownBtn
} from "./styles";


import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { useState,createContext } from "react";

//contolled : manter em tempo real a inforacao dos inputs no estado da aplicacao dentro do estado.
// uncontrolled: buscar a informacao do valor do input somente quando precisarmos dela *mais usado em formularios muito grandes, pois nao vale a pena renderizar o componente a cada mudanca ou a cada tecla digitada.

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date

}

interface CyclesContextType{
    activeCycle:Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed:number
    markCurrentCycleAsFinished: () => void
    setSecodsPassed: (seconds:number) => void


}



export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo de 5  inutos').max(60 , 'O ciclo precisa ser de no maximo de 60 minutos'),
}) 


//uso o zod para inferi o meu schema no meu NewCycleFormData e passo ele para o hookForm 
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed,setAmountSecondsPassed] = useState(0)


    const newCycleForm = useForm<NewCycleFormData>({

        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
           task:'',
           minutesAmount: 0,
        }
    });

    const {handleSubmit,watch,reset} = newCycleForm
    
    
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



    function handleCreateNewCycle(data: NewCycleFormData){
            
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
            
            reset()
        }
        
     

    function handleInterruptCycle(){
        
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

    
    const task = watch('task')
    //variavel auxiliar
    const isSubmitDisable = !task

   

    return(
        <HomeContainer>
            <form  onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                  
                <CyclesContext.Provider value={{ activeCycle , activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed,setSecodsPassed}}>

                <FormProvider{...newCycleForm}>
                     <NewCycleForm/>
                </FormProvider>
                    <CountDown/>


                </CyclesContext.Provider>


                    {activeCycle ? (
                         <StopCountdownBtn
                         onClick={handleInterruptCycle}
                         type="button"
                     >
                         <HandPalm/>Stop
                     </StopCountdownBtn>
                    ): (
                            <StartCountdownBtn
                          disabled={isSubmitDisable}
                            type="submit"
                        >
                            <Play/>Start
                        </StartCountdownBtn>
                        )
                    }





            </form>

        </HomeContainer>

    )

}