import React, { useState } from 'react'
import { FormContent, FormFC, FormButtonReturn, FormButtonNext, FormBackground } from './StyledForm'
import { createEmails } from '../../functions/functionForm'
import { functionFile } from '../../functions/functionFile'
import { csvJSON } from '../../functions/functionFileCSV'
import FormFirst from './FormFirst'
import FormSecond from './FormSecond'
import { getOrg } from '../../functions/functionOrg'
import { creationEG, creationPG } from '../../functions/function'
import * as XLSX from "xlsx";
let domains = {
  'student': '',
  'teacher': ''
}

export default function Form() {
  const [dataExcel, setDataExcel] = useState({});
  const [dataGoogle , setDataGoogle] = useState([])
  const [org, setOrg] = useState({})
  const [valueDomain , setValueDomain] = useState(domains)
  const [dowload , setDowload] = useState({ 'value': 'first', 'archiveExcel': false, 'archiveGoogle': false, 'archiveExcelOrg': false})
  console.log(org)
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

  const changeXLSXToJsonOrg = file => {
    getOrg(file, setOrg)
    let archiveExist = file?.name ? true : false
    setDowload({...dowload, 'archiveExcelOrg': archiveExist})
  }

  const changeJSONToExcel = (students, teachers, EG, PG) => {
    var wsStudentCorrect = XLSX.utils.json_to_sheet(students.correctEmails);
    var wsStudentCreated = XLSX.utils.json_to_sheet(students.createdEmails);
    var wsTeacherCorrect = XLSX.utils.json_to_sheet(teachers.correctEmails);
    var wsTeacherCreated = XLSX.utils.json_to_sheet(teachers.createdEmails);
    var wsEG = XLSX.utils.json_to_sheet(EG);
    var wsPG = XLSX.utils.json_to_sheet(PG);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsStudentCorrect, "Alumnos");
    XLSX.utils.book_append_sheet(wb, wsStudentCreated, "Alumnos Creados");
    XLSX.utils.book_append_sheet(wb, wsTeacherCorrect, "Docentes");
    XLSX.utils.book_append_sheet(wb, wsTeacherCreated, "Docentes Creados");
    XLSX.utils.book_append_sheet(wb, wsEG, "EG");
    XLSX.utils.book_append_sheet(wb, wsPG, "PG");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  const handleOnChangeDomain = (e, role)=> {
    setValueDomain({...valueDomain, [role]: e})
  }

  const handleOnClickDownload = ()=>{
    let students = createEmails(dataExcel.dataStudent, dataGoogle, valueDomain.student)
    let teachers = createEmails(dataExcel.dataTeacher, dataGoogle, valueDomain.teacher)
    let EG = creationEG(students, org)
    let PG = creationPG(teachers, org)
    changeJSONToExcel(students, teachers, EG, PG)
  }

  const onSubmit = (e, type) => {
    e.preventDefault()
    if (type === 'first') {
      setDowload({...dowload, 'value': 'second'})
    } else {
      setDowload({...dowload, 'value': 'third'})
    }
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
                    valueDomain={valueDomain}
                    handleOnChangeDomain={handleOnChangeDomain}
                    /> 
                </FormFC> : dowload.value === 'second' ? 
                <FormFC onSubmit={(e) => onSubmit(e, 'second')}>
                  <FormSecond 
                    changeXLSXToJsonOrg={changeXLSXToJsonOrg}
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