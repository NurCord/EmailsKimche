import * as XLSX from "xlsx";

export const functionFile = (file, setDataExcel) => {
    if(file){
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = e => {
            const buffer = e.target.result
            const wb = XLSX.read(buffer, {type: "buffer"})
            const wsStudent = wb.Sheets['Alumnos'];
            const wsTeacher = wb.Sheets['Docentes'];
            const dataStudent = XLSX.utils.sheet_to_json(wsStudent);
            const dataTeacher = XLSX.utils.sheet_to_json(wsTeacher);
            setDataExcel({
                dataStudent,
                dataTeacher
            })
        }
        fileReader.onerror = (err) =>{
            console.log(err);
        }
    }
}
