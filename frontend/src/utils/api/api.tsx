import { baseUrl } from "../../constants/constants";
import { ITemporaryUser } from "../../helpers/types";

export const API = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export const createTemporaryUserApi = (form: ITemporaryUser) => {
  return fetch(`${API.baseUrl}/temp-users`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({
      firstname: form.firstname,
      lastname: form.lastname,
      fathersname: form.fathersname,
      employmentDate: form.employmentDate,
      position: form.position,
      salary: form.salary,
      role: form.role,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
