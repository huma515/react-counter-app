import React from 'react'
import { useState } from 'react'

const Counter = () => {
  
    let [statevalvar ,statevalfun] = useState (0)

  const reset  = () => statevalfun(0)
  return (
    <>
    
<div className='main'>
<div><h1>Counter App</h1></div>
<br />
<div className='counter'>{statevalvar}</div>
<br />

<div className='btn-div'>
<button className='btn' onClick={() =>statevalfun( statevalvar- 1)} disabled={statevalvar === 0}>-</button>
<button className='btn' onClick={reset}>Reset</button>
<button className='btn' onClick={() =>statevalfun (statevalvar+ 1) }>+</button>
</div>
</div>
    </>
  )
}

export default Counter