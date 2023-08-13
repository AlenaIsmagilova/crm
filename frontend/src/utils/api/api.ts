import { baseUrl } from "../../constants/constants";
import {
  IRegistrationForm,
  ISignInForm,
  ITemporaryUser,
} from "../../helpers/types";

export const API = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export const createTemporaryUserApi = (form: ITemporaryUser) => {
  return fetch(`${API.baseUrl}/temp-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
    body: JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      fatherName: form.fatherName,
      employmentDate: form.employmentDate,
      position: form.position,
      salary: form.salary,
      role: form.role,
    }),
  }).then((res) => res.json());
};

export const signInApi = (form: ISignInForm) => {
  return fetch(`${API.baseUrl}/users/signin`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    }),
  }).then((res) => res.json());
};

export const signUpApi = (form: IRegistrationForm, username: string) => {
  return fetch(`${API.baseUrl}/users/signup`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({
      username,
      password: form.password,
    }),
  }).then((res) => res.json());
};

export const getCurrentTemporaryUserApi = (username: string) => {
  return fetch(`${API.baseUrl}/temp-users/get-temp-user-by-username`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({ username }),
  });
};

export const getUser = () => {
  return fetch(`${API.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then((res) => res.json());
};
