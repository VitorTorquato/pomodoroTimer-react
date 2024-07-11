import { Play } from "@phosphor-icons/react"
import { HomerContainer ,FormContainer , CountdownContainer, Separator} from "./styles"


export function Home(){



    return(
        <HomerContainer>
            <form action="">
                    <FormContainer>
                        <label htmlFor="task">Vou trabalhar em</label>    
                        <input id="task" />

                        <label htmlFor="minutesAmount">Duante</label>
                        <input type="number"  id="minutesAmount"/>

                        <span>minutos.</span>
                    </FormContainer>                


                    <CountdownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separator>:</Separator>
                        <span>0</span>
                        <span>0</span>
                    </CountdownContainer>


                    <button
                        type="submit"
                    >
                        <Play/>
                    </button>





            </form>

        </HomerContainer>

    )

}