import styled from "styled-components";



export const HomeContainer = styled.main`
        flex: 1;

        display: flex;
        flex-direction: center;
        justify-content: center;
        

        form{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3.5rem;

            padding-bottom: 1rem;
        }

`;









export const BaseCountdownBtn = styled.button` 

    width: 100%;
    border: 0;
    padding: 1rem;
    
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: .5rem;
    font-weight: bold;

    cursor: pointer;

    color: ${props => props.theme["gray-100"]};


    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }        

   



`;

export const StartCountdownBtn = styled(BaseCountdownBtn)`
     background-color: ${props => props.theme["green-700"]};

     &:not(:disabled):hover{
        background: ${props => props.theme["green-700"]};
    } 
`;

export const StopCountdownBtn = styled(BaseCountdownBtn)`


background-color: ${props => props.theme["red-500"]};
    

     &:not(:disabled):hover{
        background: ${props => props.theme["red-700"]};
    } 
`;



