import React, {useState, useEffect} from "react"

function ExplainUseEffect() {

    const [count, setCount] = useState(0)
    useEffect(() => {
      console.log("should always run")
    })

    useEffect(() => {
      console.log("would only run when the component mounts")

    }, [])

    useEffect(() => {
      console.log("would change evertime count changes")
    }, [count])

  return (
     <div style={{position: "relative"}}>
        <button style={{color: "white", left: "101px"}} onClick={() => setCount( (prevCount) => prevCount - 1)}>DEC</button>
        <span style={{fontSize: "30px"}}>{count}</span>
        <button style={{color: "white"}}  onClick={() => setCount( (prevCount) => prevCount + 1)}>INC</button>
     </div>
    
  );
}

export default ExplainUseEffect;
