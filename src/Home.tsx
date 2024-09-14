import { createContext ,useContext, useState } from "react"

const CyclesContext = createContext({} as any)

export function NewCycleForm(){

    let { activeCycle,setActiveCycle } = useContext(CyclesContext)


return(
    <h1>
        NewCycleForm:{activeCycle}

        <button
        type="button"
        onClick={() => {
            setActiveCycle(2)
    }}>
        Alterar Ciclo
        </button>
    </h1>

)
}

export function CountDown(){

    const {activeCycle} = useContext(CyclesContext)

    return <h1>CountDown : {activeCycle}</h1>
}

export function Home2(){

    const [activeCycle,setActiveCycle] = useState(0)


    return(
        <CyclesContext.Provider value={{ activeCycle , setActiveCycle}}>
        <div>
            <NewCycleForm/>
            <CountDown/>
        </div>

        </CyclesContext.Provider>
    )
}