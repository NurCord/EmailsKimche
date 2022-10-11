import React from 'react'
import { domains, stateInitial } from '../../variables/formVariables'
import { FormBackground, FormButtonReturn, FormButtonNext } from './StyledForm'

export default function FormDowload({setDowload, setValueDomain, handleOnClickDownload}) {
  return (
    <FormBackground>
        <FormButtonReturn onClick={()=> {
        setDowload(stateInitial) 
        setValueDomain(domains)}}
        > x </FormButtonReturn>
        <FormButtonNext onClick={handleOnClickDownload}>Descargar</FormButtonNext>
    </FormBackground>
  )
}
