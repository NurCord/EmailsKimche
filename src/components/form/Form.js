import React, { useState } from "react";
import { FormContent, FormFC, FormBackground } from "./StyledForm";
import { createEmails } from "../../functions/functionForm";
import FormFirst from "./FormFirst";
import FormSecond from "./FormSecond";
import { createUSERPG } from "../../functions/functionUSERPG";
import { domains, stateInitial } from "../../variables/formVariables";
import FormDowload from "./FormDowload";
import { changeCSVToJson, changeXLSXToJson, changeXLSXToJsonOrg, downloadXLSX } from "../../functions/filesFunctions";

export default function Form() {
  const [dataExcel, setDataExcel] = useState({});
  const [dataGoogle, setDataGoogle] = useState([]);
  const [org, setOrg] = useState({});
  const [valueDomain, setValueDomain] = useState(domains);
  const [dowload, setDowload] = useState(stateInitial);

  const handleOnChangeDomain = (e, role) => {
    setValueDomain({ ...valueDomain, [role]: e });
  };

  const handleOnClickDownload = () => {
    let mailsCreated = createEmails(
      dataExcel.dataStudent,
      dataExcel.dataTeacher,
      dataGoogle,
      valueDomain
    );
    let students = mailsCreated.students;
    let teachers = mailsCreated.teachers;
    let USERPG = createUSERPG(students, teachers, org, dataGoogle);
    downloadXLSX(students, teachers, USERPG, dataExcel?.nameArchive);
  };

  const onSubmit = (e, type) => {
    e.preventDefault();
    setDowload({ ...dowload, value: type === "first" ? "second" : "third" });
  };

  const VIEW = {
    first: (
      <FormFC onSubmit={(e) => onSubmit(e, "first")}>
        <FormFirst
          setDowload={setDowload}
          dowload={dowload}
          changeXLSXToJson={(file) =>
            changeXLSXToJson(file, setDowload, setDataExcel, dowload)
          }
          changeCSVToJson={(file) =>
            changeCSVToJson(file, setDataGoogle, dowload, setDowload)
          }
          valueDomain={valueDomain}
          handleOnChangeDomain={handleOnChangeDomain}
        />
      </FormFC>
    ),
    second: (
      <FormFC onSubmit={(e) => onSubmit(e, "second")}>
        <FormSecond
          changeXLSXToJsonOrg={(file) =>
            changeXLSXToJsonOrg(file, setOrg, setDowload, dowload)
          }
          setOrg={setOrg}
          setDowload={setDowload}
          dowload={dowload}
        />
      </FormFC>
    ),
    third: (
      <FormDowload
        setDowload={setDowload}
        setValueDomain={setValueDomain}
        handleOnClickDownload={handleOnClickDownload}
      />
    ),
  };

  return (
    <FormContent>
      <FormBackground>
        {VIEW[dowload.value]}
      </FormBackground>
    </FormContent>
  );
}

/*
 */
