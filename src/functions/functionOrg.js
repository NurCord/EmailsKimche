import * as XLSX from "xlsx";

export function getOrg(data, setOrg) {
        if(data){
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(data)
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
        }
}