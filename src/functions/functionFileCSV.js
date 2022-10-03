import Papa from "papaparse";

export function csvJSON(csv, setDataGoogle) {
    if (csv) {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setDataGoogle(results.data) 
          }}
        )
      }
}