import { Play } from "@phosphor-icons/react";
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

import { HomeContainer ,FormContainer , CountdownContainer, Separator, StartCountdownBtn, TaskInput, MinutesAmount} from "./styles";


//contolled : manter em tempo real a inforacao dos inputs no estado da aplicacao dentro do estado.
// uncontrolled: buscar a informacao do valor do input somente quando precisarmos dela *mais usado em formularios muito grandes, pois nao vale a pena renderizar o componente a cada mudanca ou a cada tecla digitada.



/**
 function register(name: string){
 return(

        onChange () => void,
           onBlur () => void 
 )
 
 }

* */

//Criacao do schema
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo de 5  inutos').max(60 , 'O ciclo precisa ser de no maximo de 60 minutos'),
}) 




type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
        
    const {register , handleSubmit , watch, reset} = useForm<NewCycleFormData>({

        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
           task:'',
           minutesAmount: 0,
        }
    });


    function handleCreateNewCycle(data: NewCycleFormData){
            console.log(data)
            reset()
    }

    const task = watch('task')


    //variavel auxiliar
    const isSubmitDisable = !task


    return(
        <HomeContainer>
            <form  onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                    <FormContainer>
                        <label htmlFor="task">Vou trabalhar em</label>

                        <TaskInput 
                        placeholder="Qual o nome do seu projeto" 
                        id="task" 
                        list="task-suggestions"
                        {...register('task')}
                        />

                        <datalist id="task-suggestions">
                            <option value="projeto 1"/>
                            <option value="projeto 2"/>
                            <option value="projeto 3"/>
                            <option value="projeto 4"/>
                        </datalist>

                        <label htmlFor="minutesAmount">Durante</label>
                        <MinutesAmount
                        placeholder="00"
                        type="number"
                        id="minutesAmount"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount' , {valueAsNumber: true})}
                        />

                        <span>minutos.</span>
                    </FormContainer>                


                    <CountdownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separator>:</Separator>
                        <span>0</span>
                        <span>0</span>
                    </CountdownContainer>


                    <StartCountdownBtn
                        disabled={isSubmitDisable}
                        type="submit"
                    >
                        <Play/>Start
                    </StartCountdownBtn>





            </form>

        </HomeContainer>

    )

}