import React, { useState } from 'react'
import { FormContent, FormFC, FormInput, FormButtonFile, FormFile, FormButton, FormInputs, FormBackground } from './StyledForm'
import { createEmails } from '../../functions/functionForm'
import { functionFile } from '../../functions/functionFile'
import { csvJSON } from '../../functions/functionFileCSV'

let domains = {
  'student': '',
  'teacher': ''
}

export default function Form() {
  const [dataExcel, setDataExcel] = useState({});
  const [dataGoogle , setDataGoogle] = useState([])
  const [valueDomain , setValueDomain] = useState(domains)
  
  const changeXLSXToJson = file => {
    functionFile(file, setDataExcel)
  }

  const changeCSVToJson = file => {
    csvJSON(file, setDataGoogle)
  }


  const handleOnChangeDomain = (e, role)=> {
    setValueDomain({...valueDomain, [role]: e})
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log(dataExcel.dataStudent)
    if(dataExcel.dataStudent){
      console.log(createEmails(dataExcel.dataStudent, dataGoogle, valueDomain.student));
    }
    if(dataExcel.dataTeacher){
      console.log(createEmails(dataExcel.dataTeacher, dataGoogle, valueDomain.teacher));
    }
  }
  
  return (
    <FormContent>
      <FormBackground>
        <FormFC onSubmit={onSubmit}>
          <FormInputs>
            <FormInput type='text' required placeholder='Dominio email alumno, ej: @escuela.cl' name='student' pattern="^@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={e => handleOnChangeDomain(e.target.value, 'student')}/>
          </FormInputs>
         <FormInputs>
            <FormInput type='text' placeholder='Dominio email docente, ej: @escuela.cl' pattern="^@[a-z0-9.-]+\.[a-z]{2,4}$" name='teacher' onChange={e => handleOnChangeDomain(e.target.value, 'teacher')}/>
          </FormInputs>
          <FormInputs>
            <FormButtonFile file={dataExcel.dataStudent?.length > 0 ? true : false}>
              Subir Archivo
              <FormFile required type={'file'} onChange={e => changeXLSXToJson(e.target.files[0])} />
            </FormButtonFile>
            <FormButtonFile file={dataGoogle?.length > 0 ? true : false}>
              Subir Archivo Google
              <FormFile required type={'file'} onChange={e => changeCSVToJson(e.target.files[0])} />
            </FormButtonFile> 
          </FormInputs>
          <FormButton type={'submit'} />
        </FormFC>
      </FormBackground>
    </FormContent>
  )
}
