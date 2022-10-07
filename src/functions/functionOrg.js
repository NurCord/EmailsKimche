import * as XLSX from "xlsx";

export function getOrg(data, setOrg) {
        if(data){
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(data)
            fileReader.onload = e => {
                const buffer = e.target.result
                const wb = XLSX.read(buffer, {type: "buffer"})
                const wsNameOrg = wb.SheetNames[13]
                const wsOrg = wb.Sheets[wsNameOrg];
                const dataOrg = XLSX.utils.sheet_to_json(wsOrg);
                setOrg({
                    dataOrg
                })
            }
            fileReader.onerror = (err) =>{
                console.log(err);
            }
        }
}