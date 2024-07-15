import { Play } from "@phosphor-icons/react"
import { HomeContainer ,FormContainer , CountdownContainer, Separator, StartCountdownBtn, TaskInput, MinutesAmount} from "./styles"


export function Home(){



    return(
        <HomeContainer>
            <form action="">
                    <FormContainer>
                        <label htmlFor="task">Vou trabalhar em</label>    
                        <TaskInput 
                        placeholder="Qual o nome do seu projeto" 
                        id="task" 
                        list="task-suggestions"
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
                        max={60}/>

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
                    disabled
                        type="submit"
                    >
                        <Play/>Start
                    </StartCountdownBtn>





            </form>

        </HomeContainer>

    )

}