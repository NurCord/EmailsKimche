import React from 'react'
import { FormInputs, FormSelect, FormInput, FormButton, FormButtonReturn } from './StyledForm'
import SvgBack from '../scrollimg/svg/SvgBack'
export default function FormSecond({setOrg, setDowload, dowload}) {
  return (
    <>
        <FormInputs>
            <FormSelect>
                <option value='Org' disabled>Org</option>
                <option value='Manual'>Manual</option>
                <option value='Archivo'>Archivo</option>
            </FormSelect>
        </FormInputs> 
        <FormInputs>
            <FormInput type='text' placeholder='Org, ej: /RBD - nombre de colegio/rol' name='org' onChange={e => setOrg(e.target.value)}/>
        </FormInputs>
        <FormButtonReturn onClick={() => setDowload({...dowload, 'value': 'first'})}><SvgBack/></FormButtonReturn>
        <FormButton type='submit'/>
    </>
  )
}
