import { useState } from 'react'
import './App.css'
import { FunctionName } from './components/FunctionalCompOne.jsx'
import {FunctionalComponentsBasics} from './components/FunctionalComponentsBasics.jsx'
import { ClassComponentsBasics } from './components/ClassComponentsBasics.jsx'
import {FunctionComp} from './components/FunctionalComponentsAdv.jsx'

function App() {
  return (
    // Fragment in react: <> </>
    <>
    {/*Component name */}
    {/* <FunctionName /> 
    <FunctionalComponentsBasics /> 
     <ClassComponentsBasics /> */}
    <FunctionComp/>
    </>
  )
}
export default App