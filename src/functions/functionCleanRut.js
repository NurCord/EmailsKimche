export default function cleanRut(rut){
    let indexToCut = rut.indexOf('-')
    let cleanRut = rut.slice(0, indexToCut).replaceAll('.', '')
    return cleanRut
  }