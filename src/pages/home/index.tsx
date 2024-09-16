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
import { useContext } from "react";
import { CyclesContext } from "../../contexts/Cyclescontext";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo de 5  inutos').max(60 , 'O ciclo precisa ser de no maximo de 60 minutos'),
}) 


//uso o zod para inferi o meu schema no meu NewCycleFormData e passo ele para o hookForm 
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

    const {createNewCycle,interruptCycleCurrentCycle,activeCycle} = useContext(CyclesContext)


    const newCycleForm = useForm<NewCycleFormData>({

        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
           task:'',
           minutesAmount: 0,
        }
    });

    const {handleSubmit,watch,reset} = newCycleForm
    
    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }
    
    const task = watch('task')
    //variavel auxiliar
    const isSubmitDisable = !task

   

    return(
        <HomeContainer>
            <form  onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                  
               

                <FormProvider{...newCycleForm}>
                     <NewCycleForm/>
                </FormProvider>
                    <CountDown/>




                    {activeCycle ? (
                         <StopCountdownBtn
                         onClick={interruptCycleCurrentCycle}
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