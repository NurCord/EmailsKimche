import React from 'react'
import { FormInputs, FormInput, FormButtonFile, FormFile, FormButton} from './StyledForm'

export default function FormFirst({ dowload, changeXLSXToJson, changeCSVToJson, handleOnChangeDomain, valueDomain}) {
  return (
        <>
            <FormInputs>
                <FormInput type='text' required placeholder='Dominio email alumno, ej: @escuela.cl' name='student' value={valueDomain.student} pattern="^@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={e => handleOnChangeDomain(e.target.value, 'student')}/>
            </FormInputs>
            <FormInputs>
                <FormInput type='text' placeholder='Dominio email docente, ej: @escuela.cl' pattern="^@[a-z0-9.-]+\.[a-z]{2,4}$" name='teacher' value={valueDomain.teacher} onChange={e => handleOnChangeDomain(e.target.value, 'teacher')}/>
            </FormInputs>
            <FormInputs>
                <FormButtonFile file={dowload?.archiveExcel ? true : false}>
                    Subir Archivo
                    <FormFile required type={'file'} onChange={e => changeXLSXToJson(e.target.files[0])} />
                </FormButtonFile>
                <FormButtonFile file={dowload?.archiveGoogle ? true : false}>
                    Subir Archivo Google
                    <FormFile required type={'file'} onChange={e => changeCSVToJson(e.target.files[0])} />
                </FormButtonFile> 
            </FormInputs>
            <FormButton type='submit' value="Continuar"/>
        </>
  )
}
