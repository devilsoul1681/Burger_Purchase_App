import React from "react";
import Auxillary from "../../hoc/Auxillary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Sidedrawer/Sidedrawer";

function Outer(props){
    const [sidedrawer,setsidedrawer]=React.useState(false);
    function opendrawer(){
        setsidedrawer(true);
    }
    function closedrawer(){
        setsidedrawer(false)
    }
    return (
        <Auxillary>
        <Toolbar click={opendrawer} />
        <Sidedrawer open={sidedrawer} click={closedrawer}/>
        <main>
            {props.children}
        </main>
        </Auxillary>
    )
}

export default Outer