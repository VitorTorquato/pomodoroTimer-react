import {FormContainer, MinutesAmount,TaskInput} from './styles'



import { useContext } from 'react';

import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/Cyclescontext';




export function  NewCycleForm(){

    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()
    

    return(
        <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>

        <TaskInput 
        placeholder="Qual o nome do seu projeto" 
        id="task" 
        list="task-suggestions"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        {...register('minutesAmount' , {valueAsNumber: true})}
        />

        <span>minutos.</span>
    </FormContainer>                

    )
}