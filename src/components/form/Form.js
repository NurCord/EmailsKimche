import React, { useState } from 'react'
import { FormContent, FormFC, FormInput, FormButtonDownload, FormButtonFile, FormFile, FormButton, FormInputs, FormBackground } from './StyledForm'
import { createEmails } from '../../functions/functionForm'
import { functionFile } from '../../functions/functionFile'
import { csvJSON } from '../../functions/functionFileCSV'
import * as XLSX from "xlsx";
let domains = {
  'student': '',
  'teacher': ''
}

export default function Form() {
  const [dataExcel, setDataExcel] = useState({});
  const [dataGoogle , setDataGoogle] = useState([])
  const [valueDomain , setValueDomain] = useState(domains)
  const [dowload , setDowload] = useState({ 'value': true, 'archive': ''})
  
  const changeXLSXToJson = file => {
    functionFile(file, setDataExcel)
  }

  const changeCSVToJson = file => {
    csvJSON(file, setDataGoogle)
  }

  const changeJSONToExcel = (students, teachers) => {
    var wsStudentCorrect = XLSX.utils.json_to_sheet(students.correctEmails);
    var wsStudentCreated = XLSX.utils.json_to_sheet(students.createdEmails);
    var wsTeacherCorrect = XLSX.utils.json_to_sheet(teachers.correctEmails);
    var wsTeacherCreated = XLSX.utils.json_to_sheet(teachers.createdEmails);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsStudentCorrect, "Alumnos");
    XLSX.utils.book_append_sheet(wb, wsStudentCreated, "Alumnos Creados");
    XLSX.utils.book_append_sheet(wb, wsTeacherCorrect, "Docentes");
    XLSX.utils.book_append_sheet(wb, wsTeacherCreated, "Docentes Creados");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  const handleOnChangeDomain = (e, role)=> {
    setValueDomain({...valueDomain, [role]: e})
  }

  const handleOnClickDownload = ()=>{
    let students = createEmails(dataExcel.dataStudent, dataGoogle, valueDomain.student)
    let teachers = createEmails(dataExcel.dataTeacher, dataGoogle, valueDomain.teacher)
    changeJSONToExcel(students, teachers)
  }

  const onSubmit = e => {
    e.preventDefault()
    /* if(dataExcel.dataStudent){
      console.log(createEmails(dataExcel.dataStudent, dataGoogle, valueDomain.student));
    }
    if(dataExcel.dataTeacher){
      console.log(createEmails(dataExcel.dataTeacher, dataGoogle, valueDomain.teacher));
    } */
    setDowload(false)
  }
  
  return (
    <FormContent>
      {
        dowload.value ? <FormBackground>
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
        </FormBackground> :
        <FormButtonDownload onClick={handleOnClickDownload}>Download</FormButtonDownload>
      }
    </FormContent>
  )
}
