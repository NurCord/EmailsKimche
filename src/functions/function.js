export function creationEG(data, org){
    console.log(org)

    let EGcorrect = []
    let EGcreated = []
    
    if(org?.length > 0){
      data.correctEmails.forEach(user => {
            let searchRutUser = org.find(userPG => cleanRut(userPG['Employee ID'])  === cleanRut(user.RUT))
            console.log(searchRutUser)
            if(searchRutUser){
                EGcorrect.push({
                'Rbd Without Digit': user.RBD,
                'Name (School School)': user.Establecimiento,
                'Display Name': user.Curso,
                'First Name [Required]': user.Nombre,
                'Last Name [Required]': user['Apellido Paterno'],
                'Email Address [Required]': user['Mail Libro'],
                'Org Unit Path [Required]': searchRutUser['Org Unit Path [Required]'],
                'Change Password at Next Sign-In': 'FALSO',
                'Employee ID': user.RUT,
                'Password [Required]': '****'
              })
            }
            })
      
        data.createdEmails.forEach(user => {
            let searchRutUser = org.find(userPG => cleanRut(userPG['Employee ID']) === cleanRut(user.RUT))
            console.log(searchRutUser)
            if(searchRutUser){
                EGcreated.push({
                'Rbd Without Digit': user.RBD,
                'Name (School School)': user.Establecimiento,
                'Display Name': user.Curso,
                'First Name [Required]': user.Nombre,
                'Last Name [Required]': user['Apellido Paterno'],
                'Email Address [Required]': user['Mail Libro'],
                'Org Unit Path [Required]': searchRutUser['Org Unit Path [Required]'],
                'Change Password at Next Sign-In': 'VERDADERO',
                'Employee ID': user.RUT,
                'Password [Required]': cleanRut(user.RUT).slice(0,4)
              })
            }
      })
    }else{
      data.correctEmails.forEach(user => {
        EGcorrect.push({
        'Rbd Without Digit': user.RBD,
        'Name (School School)': user.Establecimiento,
        'Display Name': user.Curso,
        'First Name [Required]': user.Nombre,
        'Last Name [Required]': user['Apellido Paterno'],
        'Email Address [Required]': user['Mail Libro'],
        'Org Unit Path [Required]': org.student,
        'Change Password at Next Sign-In': 'FALSO',
        'Employee ID': user.RUT,
        'Password [Required]': '****'
      })})
      data.createdEmails.forEach(user => {
        EGcreated.push({
          'Rbd Without Digit': user.RBD,
          'Name (School School)': user.Establecimiento,
          'Display Name': user.Curso,
          'First Name [Required]': user.Nombre,
          'Last Name [Required]': user['Apellido Paterno'],
          'Email Address [Required]': user['Mail Libro'],
          'Org Unit Path [Required]': org.student,
          'Change Password at Next Sign-In': 'VERDADERO',
          'Employee ID': user.RUT,
          'Password [Required]': cleanRut(user.RUT).slice(0,4)
        })
      })
    }
    return(EGcorrect.concat(EGcreated))
}

export function creationPG(data, org){
    let PGcorrect = []
    let PGcreated = []
    if(org?.length > 0){
        data.correctEmails.forEach(user => {
            let searchRutUser = org.find(userPG => cleanRut(userPG['Employee ID']) === cleanRut(user.RUT))
            if(searchRutUser){
              PGcorrect.push({
                'Rbd Without Digit': user.RBD,
                'Name (School School)': user.Establecimiento,
                'First Name [Required]': user.Nombre,
                'Last Name [Required]': user['Apellido Paterno'],
                'Email Address [Required]': user['Mail Libro'],
                'Org Unit Path [Required]': searchRutUser['Org Unit Path [Required]'],
                'Change Password at Next Sign-In': 'FALSO',
                'Employee ID': user.RUT,
                'Password [Required]': '****'
              })
            }
            })
      
        data.createdEmails.forEach(user => {
            let searchRutUser = org.find(userPG => cleanRut(userPG['Employee ID']) === cleanRut(user.RUT))
            if(searchRutUser){
                PGcreated.push({
                'Rbd Without Digit': user.RBD,
                'Name (School School)': user.Establecimiento,
                'First Name [Required]': user.Nombre,
                'Last Name [Required]': user['Apellido Paterno'],
                'Email Address [Required]': user['Mail Libro'],
                'Org Unit Path [Required]': searchRutUser['Org Unit Path [Required]'],
                'Change Password at Next Sign-In': 'VERDADERO',
                'Employee ID': user.RUT,
                'Password [Required]': cleanRut(user.RUT).slice(0,4)
              })
            }
      })
    }else{
      data.correctEmails.forEach(user => {
        PGcorrect.push({
        'Rbd Without Digit': user.RBD,
        'Name (School School)': user.Establecimiento,
        'First Name [Required]': user.Nombre,
        'Last Name [Required]': user['Apellido Paterno'],
        'Email Address [Required]': user['Mail Libro'],
        'Org Unit Path [Required]': org.teacher,
        'Change Password at Next Sign-In': 'FALSO',
        'Employee ID': user.RUT,
        'Password [Required]': '****'
      })})
      data.createdEmails.forEach(user => {
        PGcreated.push({
          'Rbd Without Digit': user.RBD,
          'Name (School School)': user.Establecimiento,
          'First Name [Required]': user.Nombre,
          'Last Name [Required]': user['Apellido Paterno'],
          'Email Address [Required]': user['Mail Libro'],
          'Org Unit Path [Required]': org.teacher,
          'Change Password at Next Sign-In': 'VERDADERO',
          'Employee ID': user.RUT,
          'Password [Required]': cleanRut(user.RUT).slice(0,4)
        })
      })
    }
    return(PGcorrect.concat(PGcreated))
}


function cleanRut(rut){
    let indexToCut = rut.indexOf('-')
    let cleanRut = rut.slice(0, indexToCut).replaceAll('.', '')
    return cleanRut
  }