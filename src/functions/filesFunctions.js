import * as XLSX from "xlsx";
import Papa from "papaparse";

export const changeXLSXToJson = (file, setDowload, setDataExcel, dowload) => {
    if(file){
        setDowload({...dowload, 'archiveExcel': true})
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = e => {
            const buffer = e.target.result
            const wb = XLSX.read(buffer, {type: "buffer"})
            const wsStudent = wb.Sheets['Alumnos'];
            const wsTeacher = wb.Sheets['Docentes'];
            const dataStudent = XLSX.utils.sheet_to_json(wsStudent);
            const dataTeacher = XLSX.utils.sheet_to_json(wsTeacher);
            let nameArchive = `${dataStudent[0].RBD}-${dataStudent[0].Establecimiento.replaceAll(' ', '-')}-MailGoogle`
            setDataExcel({
                dataStudent,
                dataTeacher,
                nameArchive
            })
        }
        fileReader.onerror = (err) =>{
            console.log(err);
        }
    }else {
        setDowload({...dowload, 'archiveExcel': false})
    }
}
  
export const changeCSVToJson = (file, setDataGoogle, dowload, setDowload) => {
   if (file) {
        setDowload({...dowload, 'archiveGoogle': true})
        Papa.parse(file, {
        header: true,
        complete: (results) => {
            setDataGoogle(results.data) 
        }}
        )
  }else{
    setDowload({...dowload, 'archiveGoogle': false})
   }
 }

export const changeXLSXToJsonOrg = (file, setOrg, setDowload, dowload) => {
  if(file){
    setDowload({...dowload, 'archiveExcelOrg': true})
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = e => {
        const buffer = e.target.result
        const wb = XLSX.read(buffer, {type: "buffer"})
        const wsOrgEG = wb.Sheets['EG'];
        const wsOrgPG = wb.Sheets['PG'];
        const dataOrgEG = XLSX.utils.sheet_to_json(wsOrgEG);
        const dataOrgPG = XLSX.utils.sheet_to_json(wsOrgPG);
        setOrg(dataOrgEG.concat(dataOrgPG))
    }
    fileReader.onerror = (err) =>{
        console.log(err);
    }
    }else{
        setDowload({...dowload, 'archiveExcelOrg': false})
    }
}

export const changeJSONToXLSX = (students,teachers,userpg) =>{
    let wsStudentCorrect = XLSX.utils.json_to_sheet(students.correctEmails);
    let wsStudentCreated = XLSX.utils.json_to_sheet(students.createdEmails);
    let wsError = XLSX.utils.json_to_sheet(students.errorMails.concat(teachers.errorMails));
    let wsTeacherCorrect = XLSX.utils.json_to_sheet(teachers.correctEmails);
    let wsTeacherCreated = XLSX.utils.json_to_sheet(teachers.createdEmails);
    let wsUSERPG = XLSX.utils.json_to_sheet(userpg);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsStudentCorrect, "Alumnos");
    XLSX.utils.book_append_sheet(wb, wsStudentCreated, "Alumnos Creados");
    XLSX.utils.book_append_sheet(wb, wsTeacherCorrect, "Docentes");
    XLSX.utils.book_append_sheet(wb, wsTeacherCreated, "Docentes Creados");
    XLSX.utils.book_append_sheet(wb, wsError, "Mails Erroneos");
    XLSX.utils.book_append_sheet(wb, wsUSERPG, "USERPG");
    return wb;
}

export const downloadXLSX = (students, teachers, USERPG, archiveName) => {
    let archive = changeJSONToXLSX(students, teachers, USERPG)
    XLSX.writeFile(archive, `${archiveName}sheetjs.xlsx`);
  }