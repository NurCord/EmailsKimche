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

function normalizeEmail(email){
  return email.normalize("NFD").replace(/[ \u0300-\u036f]/g, "")
}

function cleanRut(rut){
  let indexToCut = rut.indexOf('-')
  let cleanRut = rut.slice(0, indexToCut).replaceAll('.', '')
  return cleanRut
}

export const createEmails = (dataUsersExcel, dataUsersGoogle, emailDomain)=>{
    let correctEmails = []
    let createdEmails = []
    let objEmails = {}

    let dataUsersGoogleCleanRut = dataUsersGoogle.map(userGoogle => {
      return {
      	...userGoogle, 'Employee ID': cleanRut(userGoogle['Employee ID'])
      }
    })

    dataUsersExcel.forEach(user => {

        let searchRutUser = dataUsersGoogleCleanRut.find(userGoogle => userGoogle['Employee ID'] === cleanRut(user.RUT))

      	if(searchRutUser){
          correctEmails.push({...user, 'Mail Libro': searchRutUser['Email Address [Required]']})
        }else{
          if(user['Mail Libro']?.includes(emailDomain)){
            correctEmails.push(user)
           }else{
            let newEmail = `${user.Nombre.toLowerCase()}.${user['Apellido Paterno'].toLowerCase()}${emailDomain}`
  
            newEmail = normalizeEmail(newEmail)
  
            objEmails[newEmail] = objEmails[newEmail] ? objEmails[newEmail] + 1 : 1
            
            let countEmails = objEmails[newEmail]
            
            newEmail = countEmails !== 1 ? newEmail.replace('@', `.${countEmails}@`) : newEmail
              
            createdEmails = [...createdEmails, {...user, 'Mail Libro': newEmail}]
          }
        }
      })
    return  {correctEmails, createdEmails}
} 