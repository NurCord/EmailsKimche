import React from 'react'
import { FormInputs, FormSelect, FormInput, FormButton, FormButtonReturn, FormButtonFile, FormFile } from './StyledForm'
import SvgBack from '../scrollimg/svg/SvgBack'
import { useState } from 'react'
export default function FormSecond({changeXLSXToJsonOrg, setOrg, setDowload, dowload}) {
  const [typeOfOrg, setTypeOfOrg] = useState('manual')

  const handleOnClick = () => {
    setDowload({...dowload, 'value': 'first', 'archiveExcel': false, 'archiveGoogle': false})
  }
  const handleOnChange = (e) => {
    setTypeOfOrg(e)
  }
  const handleOnChangeOrg = (e, role) => {
    setOrg(prevValue => {return {...prevValue, [role]: e}})
  }

  return (
    <>
        <FormInputs>
            <FormSelect onChange={(e) => handleOnChange(e.target.value)}>
                <option value='Org' disabled>Org</option>
                <option value='Archivo'>Archivo</option>
                <option value='Manual'>Manual</option>
            </FormSelect>
        </FormInputs> 
        {
          typeOfOrg === 'Manual' ? 
          <>
            <FormInputs>
              <FormInput type='text' required placeholder='Org Student, ej: /RBD - nombre de colegio/rol' name='org' onChange={e => handleOnChangeOrg(e.target.value, 'student')}/>
            </FormInputs> 
            <FormInputs>
              <FormInput type='text' required placeholder='Org Teacher, ej: /RBD - nombre de colegio/rol' name='org' onChange={e => handleOnChangeOrg(e.target.value, 'teacher')}/>
            </FormInputs> 
          </>  
          : 
          <FormButtonFile file={dowload?.archiveExcelOrg ? true : false}>
            Subir Archivo
            <FormFile required type={'file'} accept=".xlsx, .xls" onChange={e => changeXLSXToJsonOrg(e.target.files[0])} />
          </FormButtonFile>
        }
        <FormButtonReturn onClick={handleOnClick}><SvgBack/></FormButtonReturn>
        <FormButton type='submit'/>
    </>
  )
}
