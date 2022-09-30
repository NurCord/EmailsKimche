import React, { useState } from 'react'
import * as XLSX from "xlsx";
import { FormContent, FormFC, FormInput, FormButtonFile, FormFile, FormButton, FormInputs, FormBackground } from './StyledForm'
let domain = {
}

export default function Form() {
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [domainEmail , setDomainEmail] = useState(domain)
  const [valueDomain , setValueDomain] = useState('')

  const handleOnChange = e => {
    const result = () => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(e)
      fileReader.onload = e =>{
        const buffer = e.target.result
        const wb = XLSX.read(buffer, {type: "buffer"})
        const wsNameStudent = wb.SheetNames[2]
        const wsNameTeacher = wb.SheetNames[1]
        const wsStudent = wb.Sheets[wsNameStudent];
        const wsTeacher = wb.Sheets[wsNameTeacher];
        const dataStudent = XLSX.utils.sheet_to_json(wsStudent);
        const dataTeacher = XLSX.utils.sheet_to_json(wsTeacher);
        setStudents(dataStudent)
        setTeacher(dataTeacher)
      }
      fileReader.onerror = (err) =>{
        console.log(err);
      }
    }
    result()
  }

  const handleOnChangeDomain = e => {
    setValueDomain(e)
  }

  const onSubmit = e => {
    console.log(e)
  }
  
  return (
    <FormContent>
      <FormBackground>
        <FormFC onSubmit={onSubmit}>
          <FormInputs>
            <FormInput type='text' required placeholder='Dominio email alumno' pattern="@(!yahoo|!hotmail|!gmail)\.cl" name={domain} onChange={e => handleOnChangeDomain(e.target.value)}/>
          </FormInputs>
          <FormInputs>
            <FormInput type='text' placeholder='Dominio email docente' name={domain} onChange={e => handleOnChangeDomain(e.target.value)}/>
          </FormInputs>
          <FormInputs>
            <FormButtonFile>
              Subir Archivo
              <FormFile required type={'file'} onChange={e => handleOnChange(e.target.files[0])} />
            </FormButtonFile>
            <FormButtonFile>
              Subir Archivo Google
              <FormFile required type={'file'} onChange={e => handleOnChange(e.target.files[0])} />
            </FormButtonFile>
          </FormInputs>
          <FormButton type={'submit'} />
        </FormFC>
      </FormBackground>
    </FormContent>
  )
}
