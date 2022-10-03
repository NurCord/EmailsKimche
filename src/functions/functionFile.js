import * as XLSX from "xlsx";

export const functionFile = (file, setDataExcel) => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = e => {
            const buffer = e.target.result
            const wb = XLSX.read(buffer, {type: "buffer"})
            const wsNameStudent = wb.SheetNames[2]
            const wsNameTeacher = wb.SheetNames[1]
            const wsStudent = wb.Sheets[wsNameStudent];
            const wsTeacher = wb.Sheets[wsNameTeacher];
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
