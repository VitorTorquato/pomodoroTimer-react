import { HeaderContainer } from "./styles.";
import { Timer , Scroll} from '@phosphor-icons/react' 

import Logo from '../../assets/Logo.svg'
import { NavLink } from "react-router-dom";



export function Header(){
    return (
        <HeaderContainer>
            
        <span><img src={Logo} alt="" /></span>
            
            <nav>
                <NavLink to="/" title="timer">
                    <Timer size={24}/>
                </NavLink>

                <NavLink to="history" title="history">    
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}