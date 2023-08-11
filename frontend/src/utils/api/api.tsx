import { baseUrl } from "../../constants/constants";
import { getCookie } from "../../helpers";
import { IRegistrationForm, ITemporaryUser } from "../../helpers/types";

export const API = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export const createTemporaryUserApi = (form: ITemporaryUser) => {
  return (
    fetch(`${API.baseUrl}/temp-users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      } as HeadersInit,
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
      //здесь должен вернуться юзернейм
      .then((data) => console.log(data))
  );
};

export const signInApi = (form: IRegistrationForm) => {
  return fetch(`${API.baseUrl}/users/signin`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    }),
  }).then((res) => res.json());
};

export const signUpApi = (form: IRegistrationForm) => {
  return fetch(`${API.baseUrl}/users/signup`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
