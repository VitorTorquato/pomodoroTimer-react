import { HandPalm, Play } from "@phosphor-icons/react";
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

import { HomeContainer,
    StartCountdownBtn,
    StopCountdownBtn
} from "./styles";


import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'


import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

//contolled : manter em tempo real a inforacao dos inputs no estado da aplicacao dentro do estado.
// uncontrolled: buscar a informacao do valor do input somente quando precisarmos dela *mais usado em formularios muito grandes, pois nao vale a pena renderizar o componente a cada mudanca ou a cada tecla digitada.




//Criacao do schema
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo de 5  inutos').max(60 , 'O ciclo precisa ser de no maximo de 60 minutos'),
}) 



//uso o zod para inferi o meu schema no meu NewCycleFormData e passo ele para o hookForm 
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date

}

export function Home(){

    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed,setAmountSecondsPassed] = useState(0)

    const {register , handleSubmit , watch, reset} = useForm<NewCycleFormData>({

        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
           task:'',
           minutesAmount: 0,
        }
    });



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
        
        const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
        const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    
        useEffect(() => {

            let interval:number;

        if(activeCycle){
            interval = setInterval(() => {

                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate,

            )

                if(secondsDifference >= totalSeconds){
                    setCycles((state) => 
                        state.map((cycle) => {
                            if(cycle.id === activeCycleId){
                                return{ ...cycle,finishedDate : new Date()}
                            }else{
                                return cycle
                            }
                            
                        })
                    )
                    setAmountSecondsPassed(totalSeconds)

                    clearInterval(interval)
                } else {
                setAmountSecondsPassed(secondsDifference)

                }
            } , 1000)
        }

        return () => {
            clearInterval(interval)
        }
    },[activeCycle,totalSeconds,activeCycleId ])

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

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0


    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2 ,'0')
    const seconds = String(secondsAmount).padStart(2 ,'0')


    useEffect(() => {
       
       if(activeCycle){
           document.title = `${minutes}:${seconds}`

       }
       

    } ,[minutes,seconds,activeCycle])

    const task = watch('task')


    //variavel auxiliar
    const isSubmitDisable = !task

   

    return(
        <HomeContainer>
            <form  onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                  

                    <NewCycleForm/>

                    <CountDown/>


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