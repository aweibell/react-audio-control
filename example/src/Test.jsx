import React, { useState }  from 'react'

const App = () => {

  const [state, setState] = useState({value: 'initial'})

  const updateHandler = () => {
    setState(prev => {
      return {
        value: prev.value + '_'
      }
    })
  }

  const setHandler = () => {
    setState({
      value: state.value +'.'
    })
  }


  return (
    <div>
      <div>state.value: {state.value}</div>
      <button onClick={updateHandler}>update</button>
      <button onClick={setHandler}>set</button>
    </div>
  )
}

export default App
