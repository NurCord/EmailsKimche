import cleanRut from "./functionCleanRut"

export function createUSERPG(students, teachers, org) {
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
                userPG.push(correctMailUserPG(user, org.student))
            });
            students.createdEmails.forEach(user => {
                userPG.push(createdMailUserPG(user, org.student))
            })
            teachers.correctEmails.forEach(user => {
                userPG.push(correctMailUserPG(user, org.teacher))
            });
            teachers.createdEmails.forEach(user => {
                userPG.push(createdMailUserPG(user, org.teacher))
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
        'Password [Required]': cleanRut(user.RUT).slice(0,4)
    }
}