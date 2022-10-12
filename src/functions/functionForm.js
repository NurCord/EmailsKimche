import { studentBase, teacher } from '../variables/formVariables'

function userToPush(userObj, rol){
  let obj = {}
  let typeRol = rol === 'Estudiante' ? studentBase : teacher
  Object.keys(typeRol).forEach(params => obj[params] = userObj[params])
  return obj
}

export function normalizeEmail(email){
  return email.normalize("NFD").replace(/[ \u0300-\u036f]/g, "")
}

export const cleanRut = (rut) => {
  let indexToCut = rut.indexOf('-')
  let cleanRut = rut.slice(0, indexToCut).replaceAll('.', '')
  return cleanRut
}

function addRol(user, changeMail, rol){
  return {
    'RBD': user.RBD,	
    'Establecimiento': user.Establecimiento,	
    'Rol': rol,
    'Nombre': user.Nombre,	
    'Apellido Paterno': user['Apellido Paterno'],	
    'Apellido Materno': user['Apellido Materno'],
    'RUT': user.RUT,
    'Mail Libro': user['Mail Libro'],
    'Mail Creado': changeMail
  }
}

export const createEmails = (dataUsersExcelStudents, dataUsersExcelTeachers, dataUsersGoogle, emailDomain)=>{
    let objEmails = {}
    let mails = dataUsersGoogle.concat(dataUsersExcelTeachers).concat(dataUsersExcelStudents)
    addEmail(objEmails, null, mails)

    let students = createdMailAndVerify(objEmails, dataUsersExcelStudents, dataUsersGoogle, emailDomain.student, 'Estudiante')

    let teacherDomain = emailDomain.teacher ? emailDomain.teacher : emailDomain.student
    let teachers = createdMailAndVerify(objEmails, dataUsersExcelTeachers, dataUsersGoogle, teacherDomain, 'Profesor')

    return { students, teachers }
} 

function verifyText(algorithm , evaluate ) {
  return algorithm.test(evaluate)
}

function createdMailAndVerify(objEmails, dataUsersExcel , dataUsersGoogle, emailDomain, rol){
    let correctEmails = []
    let createdEmails = []
    let errorMails = []

    dataUsersExcel.forEach(user => {
        user = user['Curso'] ? userToPush(user, rol) : userToPush(user,rol)
        let searchRutUser = dataUsersGoogle.find(userGoogle => cleanRut(userGoogle['Employee ID']) === cleanRut(user['RUT']))


        if(searchRutUser){
            let mail = searchRutUser['Email Address [Required]']
            
            if(verifyText(/[A-ZáéíóúñÑ üÜ]/, mail)){
              errorMails.push(addRol(user, 'NO', rol))
            }
            let mailWithDomain = normalizeEmail( mail.toLowerCase())
            correctEmails.push(
              {
              ...user, 
              'Mail Libro': mailWithDomain
            })
        
        }else{
            let mail = user['Mail Libro']
            
            if(mail?.includes(emailDomain)){
              if(verifyText(/[A-ZáéíóúñÑ üÜ]/, mail)){
                errorMails.push(addRol(user, 'NO', rol))
              }
              let mailWithDomain = normalizeEmail(mail.toLowerCase())
              correctEmails.push({...user, 'Mail Libro': mailWithDomain})
            }else{
              if(mail) errorMails.push(addRol(user, 'SI', rol))
              let name = user.Nombre.toLowerCase().split(' ')[0]
              let lastName = user['Apellido Paterno'].toLowerCase().split(' ')[0]

              let newEmail = `${name}.${lastName}${emailDomain}`

              newEmail = normalizeEmail(newEmail)

              addEmail(objEmails, newEmail) 
              
              let countEmails = objEmails[newEmail]
              
              newEmail = countEmails !== 1 ? newEmail.replace('@', `${countEmails}@`) : newEmail
                
              createdEmails = [...createdEmails, {...user, 'Mail Libro': newEmail, 'Password': cleanRut(user.RUT).slice(0,4)}]
            }
          }

    })
    return  {correctEmails, createdEmails, errorMails}
}

function addEmail(obj, mail, arrayOfMails){
  if(arrayOfMails){
    arrayOfMails.forEach(mail => {
      let userMail = mail['Email Address [Required]'] || mail['Mail Libro']
      obj[userMail] = obj[userMail] ? obj[userMail] + 1 : 1
    })
  }else{
    obj[mail] = obj[mail] ? obj[mail] + 1 : 1
  }
}											
/* 
  student = {
  'Nombre': 'Alberto',
  'RUT': '23.456.765-k',
  'Apellido Paterno': 'Jose',
  'Mail Libro': 'hola@hotmail.com'
	}
  google = {
  'First Name [Required]': 'Aláberto',
  'Employee ID': '67.456.565-7',
  'Last Name [Required]': 'FerrÜz',
  'Email Address [Required]': 'honíaÜ@google.com'
	}
*/