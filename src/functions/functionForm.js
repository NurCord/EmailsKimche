import normalizeEmail from "./functionNormalizeEmail"
import cleanRut from "./functionCleanRut"

export const createEmails = (dataUsersExcelStudents, dataUsersExcelTeachers, dataUsersGoogle, emailDomain)=>{
    let objEmails = {}

    let mails = dataUsersGoogle.concat(dataUsersExcelTeachers).concat(dataUsersExcelStudents)
    addEmail(objEmails, null, mails)

    let students = verifyMails(objEmails, dataUsersExcelStudents, dataUsersGoogle, emailDomain.student)

    let teacherDomain = emailDomain.teacher ? emailDomain.teacher : emailDomain.student
    let teachers = verifyMails(objEmails, dataUsersExcelTeachers, dataUsersGoogle, teacherDomain)

    return { students, teachers }
} 

function verifyMails(objEmails, dataUsersExcel , dataUsersGoogle, emailDomain){
    let correctEmails = []
    let createdEmails = []
    let errorMails = []

    dataUsersExcel.forEach(user => {
        user = user['Curso'] ? userToPush(user, 'student') : userToPush(user, 'teacher')

        let searchRutUser = dataUsersGoogle.find(userGoogle => cleanRut(userGoogle['Employee ID']) === cleanRut(user.RUT))

        if(searchRutUser){
          correctEmails.push({...user, 'Mail Libro': normalizeEmail(searchRutUser['Email Address [Required]'].toLowerCase())})
        }else{
          if(user['Mail Libro']?.includes(emailDomain)){
            correctEmails.push({...user, 'Mail Libro': normalizeEmail(user['Mail Libro'].toLowerCase())})
          }else{
            if(user['Mail Libro']) errorMails.push({...user})
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

let student = {
  'RBD': '',	
  'Establecimiento': '',	
  'Curso': '',
  'Nombre': '',	
  'Apellido Paterno': '',	
  'RUT': '',
  'Mail Libro': ''
}

let {Curso, ...teacher} = student 	
teacher['Apellido Materno']	= ''												

function userToPush(userObj, rol){
  let obj = {}
  let typeRol = rol === 'student' ? student : teacher
  Object.keys(typeRol).forEach(params => obj[params] = userObj[params])
  return obj
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