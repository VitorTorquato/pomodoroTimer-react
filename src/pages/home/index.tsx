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
                        id="task" />

                        <label htmlFor="minutesAmount">Durante</label>
                        <MinutesAmount
                        type="number"
                        id="minutesAmount"/>

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