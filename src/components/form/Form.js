import React, { useState } from 'react'
import { FormContent, FormFC, FormButtonReturn, FormButtonNext, FormBackground } from './StyledForm'
import { createEmails } from '../../functions/functionForm'
import { functionFile } from '../../functions/functionFile'
import { csvJSON } from '../../functions/functionFileCSV'
import FormFirst from './FormFirst'
import FormSecond from './FormSecond'
import { getOrg } from '../../functions/functionOrg'
import { createUSERPG } from '../../functions/functionUSERPG'
import * as XLSX from "xlsx";
import { domains, stateInitial} from '../../variables/formVariables'
import FormDowload from './FormDowload'

export default function Form() {
  const [dataExcel, setDataExcel] = useState({});
  const [dataGoogle , setDataGoogle] = useState([])
  const [org, setOrg] = useState({})
  const [valueDomain , setValueDomain] = useState(domains)
  const [dowload , setDowload] = useState(stateInitial)

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

  const changeJSONToExcel = (students, teachers, USERPG) => {
    let wsStudentCorrect = XLSX.utils.json_to_sheet(students.correctEmails);
    let wsStudentCreated = XLSX.utils.json_to_sheet(students.createdEmails);
    let wsError = XLSX.utils.json_to_sheet(students.errorMails.concat(teachers.errorMails));
    let wsTeacherCorrect = XLSX.utils.json_to_sheet(teachers.correctEmails);
    let wsTeacherCreated = XLSX.utils.json_to_sheet(teachers.createdEmails);
    let wsUSERPG = XLSX.utils.json_to_sheet(USERPG);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsStudentCorrect, "Alumnos");
    XLSX.utils.book_append_sheet(wb, wsStudentCreated, "Alumnos Creados");
    XLSX.utils.book_append_sheet(wb, wsTeacherCorrect, "Docentes");
    XLSX.utils.book_append_sheet(wb, wsTeacherCreated, "Docentes Creados");
    XLSX.utils.book_append_sheet(wb, wsError, "Mails Erroneos");
    XLSX.utils.book_append_sheet(wb, wsUSERPG, "USERPG");
    XLSX.writeFile(wb, `${dataExcel?.nameArchive}sheetjs.xlsx`);
  }

  const handleOnChangeDomain = (e, role)=> {
    setValueDomain({...valueDomain, [role]: e})
  }

  const handleOnClickDownload = ()=>{
    let mailsCreated = createEmails(dataExcel.dataStudent, dataExcel.dataTeacher, dataGoogle, valueDomain)
    let students = mailsCreated.students
    let teachers = mailsCreated.teachers
    let USERPG = createUSERPG(students, teachers, org, dataGoogle)
    changeJSONToExcel(students, teachers, USERPG)
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
            {
              dowload?.value === 'third' ? 
              <FormDowload
                setDowload={setDowload}
                setValueDomain={setValueDomain}
                handleOnClickDownload={handleOnClickDownload}
              />
              : null
            }
      </FormBackground>
    </FormContent>
  )
}

/* 
*/