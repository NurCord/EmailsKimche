import { cleanRut } from  './functionForm'

export function createUSERPG(students, teachers, org, orgGoogle) {
        let userPG = []
        if(org?.length > 0){
            students.correctEmails.forEach(user => {
                let searchRutUser = org.find(userPG => userPG['RUT'] ? userPG['RUT'] : cleanRut(userPG['Employee ID']) === cleanRut(user.RUT))
                if(searchRutUser){
                    userPG.push(correctMailUserPG(user, searchRutUser['Org Unit Path [Required]']))
                }})
            students.createdEmails.forEach(user => {
                let searchRutUser = org.find(userPG => userPG['RUT'] ? userPG['RUT'] : cleanRut(userPG['Employee ID']) === cleanRut(user.RUT))
                if(searchRutUser){
                    userPG.push(createdMailUserPG(user, searchRutUser['Org Unit Path [Required]']))
                }})
            teachers.correctEmails.forEach(user => {
                let searchRutUser = org.find(userPG => userPG['RUT'] ? userPG['RUT'] : cleanRut(userPG['Employee ID']) === cleanRut(user.RUT))
                if(searchRutUser){
                    userPG.push(correctMailUserPG(user, searchRutUser['Org Unit Path [Required]']))
                }})
            teachers.createdEmails.forEach(user => {
                let searchRutUser = org.find(userPG => userPG['RUT'] ? userPG['RUT'] : cleanRut(userPG['Employee ID']) === cleanRut(user.RUT))
                if(searchRutUser){
                    userPG.push(createdMailUserPG(user, searchRutUser['Org Unit Path [Required]']))
                 }})
        }else{
            students.correctEmails.forEach(user => {
                let searchOrgUser = orgGoogle.find(userGoogle => cleanRut(userGoogle['Employee ID']) === cleanRut(user.RUT))
                let orgFind = org.student;
                if(searchOrgUser?.hasOwnProperty('Org Unit Path [Required]')){
                    orgFind = searchOrgUser['Org Unit Path [Required]'] !== '' ? searchOrgUser['Org Unit Path [Required]'] : org.student
                } 
                userPG.push(correctMailUserPG(user, orgFind))
            });
            students.createdEmails.forEach(user => {
                let searchOrgUser = orgGoogle.find(userGoogle => cleanRut(userGoogle['Employee ID']) === cleanRut(user.RUT))
                let orgFind = org.student;
                if(searchOrgUser?.hasOwnProperty('Org Unit Path [Required]')){
                    orgFind = searchOrgUser['Org Unit Path [Required]'] !== '' ? searchOrgUser['Org Unit Path [Required]'] : org.student
                } 
                userPG.push(createdMailUserPG(user, orgFind))
            })
            teachers.correctEmails.forEach(user => {
                let searchOrgUser = orgGoogle.find(userGoogle => cleanRut(userGoogle['Employee ID']) === cleanRut(user.RUT))
                let orgFind = org.teacher;
                if(searchOrgUser?.hasOwnProperty('Org Unit Path [Required]')){
                    orgFind = searchOrgUser['Org Unit Path [Required]'] !== '' ? searchOrgUser['Org Unit Path [Required]'] : org.teacher
                } 
                userPG.push(correctMailUserPG(user, orgFind))
            });
            teachers.createdEmails.forEach(user => {
                let searchOrgUser = orgGoogle.find(userGoogle => cleanRut(userGoogle['Employee ID']) === cleanRut(user.RUT))
                let orgFind = org.teacher;
                if(searchOrgUser?.hasOwnProperty('Org Unit Path [Required]')){
                    orgFind = searchOrgUser['Org Unit Path [Required]'] !== '' ? searchOrgUser['Org Unit Path [Required]'] : org.teacher
                } 
                userPG.push(createdMailUserPG(user, orgFind))
            })
        }
        return userPG
}

function correctMailUserPG(user, org){
    return {
        'Employee ID': user.RUT,
        'First Name [Required]': user.Nombre,
        'Last Name [Required]': user['Apellido Paterno'],
        'Email Address [Required]': user['Mail Libro'],
        'Org Unit Path [Required]': org,
        'Change Password at Next Sign-In': 'FALSO',
        'Password [Required]': '****',
    }
}

function createdMailUserPG(user, org){
    return {
        'Employee ID': user.RUT,
        'First Name [Required]': user.Nombre,
        'Last Name [Required]': user['Apellido Paterno'],
        'Email Address [Required]': user['Mail Libro'],
        'Org Unit Path [Required]': org,
        'Change Password at Next Sign-In': 'VERDADERO',
        'Password [Required]': cleanRut(user.RUT).slice(0,4)
    }
}