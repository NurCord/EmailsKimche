import React, { useState } from 'react'
import { FormContent, FormFC, FormButtonReturn, FormButtonNext, FormBackground } from './StyledForm'
import { createEmails } from '../../functions/functionForm'
import { functionFile } from '../../functions/functionFile'
import { csvJSON } from '../../functions/functionFileCSV'
import FormFirst from './FormFirst'
import FormSecond from './FormSecond'
import * as XLSX from "xlsx";
let domains = {
  'student': '',
  'teacher': ''
}

export default function Form() {
  const [dataExcel, setDataExcel] = useState({});
  const [dataGoogle , setDataGoogle] = useState([])
  const [org , setOrg] = useState([])
  const [valueDomain , setValueDomain] = useState(domains)
  const [dowload , setDowload] = useState({ 'value': 'first', 'archiveExcel': false, 'archiveGoogle': false})
  
  const changeXLSXToJson = file => {
    functionFile(file, setDataExcel)
    let archiveExist = file?.name ? true : false
    setDowload({...dowload, 'archiveExcel': archiveExist})
  }

  const changeCSVToJson = file => {
    csvJSON(file, setDataGoogle)
    let archiveExist = file?.name ? true : false
    setDowload({...dowload, 'archiveGoogle': archiveExist})
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

  const onSubmit = (e, type) => {
    console.log(e);
    e.preventDefault()
    /* if(dataExcel.dataStudent){
      console.log(createEmails(dataExcel.dataStudent, dataGoogle, valueDomain.student));
    }
    if(dataExcel.dataTeacher){
      console.log(createEmails(dataExcel.dataTeacher, dataGoogle, valueDomain.teacher));
    } */
    type === 'first' ? setDowload({...dowload, 'value': 'second'}) : setDowload({...dowload, 'value': 'third'})
  }
  
  return (
    <FormContent>
      <FormBackground>
          {
            dowload?.value === 'first' ? 
                <FormFC onSubmit={(e) => onSubmit(e, 'first')}>
                  <FormFirst 
                    setDowload={setDowload} 
                    dowload={dowload}
                    changeXLSXToJson={changeXLSXToJson}
                    changeCSVToJson={changeCSVToJson} 
                    handleOnChangeDomain={handleOnChangeDomain}
                    /> 
                </FormFC> : dowload.value === 'second' ? 
                <FormFC onSubmit={(e) => onSubmit(e, 'second')}>
                  <FormSecond 
                    setOrg={setOrg}
                    setDowload={setDowload} 
                    dowload={dowload}
                    />
                </FormFC>
                : null
            }
      </FormBackground>
      {
        dowload?.value === 'third' ? 
        <FormBackground>
          <FormButtonReturn onClick={()=> setDowload({'archiveExcel': false, 'archiveGoogle': false, 'value': 'first'})}> x </FormButtonReturn>
          <FormButtonNext onClick={handleOnClickDownload}>Descargar</FormButtonNext>
        </FormBackground> : null
      }
    </FormContent>
  )
}

/* 
*/