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

const handleResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const createTemporaryUserApi = (form: ITemporaryUser) => {
  return fetch(`${API.baseUrl}/temp-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
    body: JSON.stringify(form),
  }).then(handleResponse);
};

export const signInApi = (form: ISignInForm) => {
  return fetch(`${API.baseUrl}/users/signin`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify(form),
  }).then(handleResponse);
};

export const signUpApi = (form: IRegistrationForm, username: string) => {
  return fetch(`${API.baseUrl}/users/signup`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({
      username,
      password: form.password,
    }),
  }).then(handleResponse);
};

export const getCurrentTemporaryUserApi = (username: string) => {
  return fetch(`${API.baseUrl}/temp-users/get-temp-user-by-username`, {
    method: "POST",
    headers: API.headers,
    body: JSON.stringify({ username }),
  }).then(handleResponse);
};

export const getUser = () => {
  return fetch(`${API.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};

export const getUsers = () => {
  return fetch(`${API.baseUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};

export const updateUserApi = (form: ITemporaryUser) => {
  return fetch(`${API.baseUrl}/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
    body: JSON.stringify(form),
  }).then(handleResponse);
};

export const updateUserAfterFirementApi = (userId: number) => {
  return fetch(`${API.baseUrl}/users/firement`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
    body: JSON.stringify({ id: userId }),
  }).then(handleResponse);
};

export const getCountOfEmployedInMonthApi = () => {
  return fetch(`${API.baseUrl}/users/statistics/employment-month`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};

export const getCountOfEmployedInYearApi = () => {
  return fetch(`${API.baseUrl}/users/statistics/employment-year`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};

export const getCountOfFiredInMonthApi = () => {
  return fetch(`${API.baseUrl}/users/statistics/firement-month`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};

export const getCountOfFiredInYearApi = () => {
  return fetch(`${API.baseUrl}/users/statistics/firement-year`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};

export const getBirthdayPeopleApi = () => {
  return fetch(`${API.baseUrl}/users/statistics/birthday-people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};

export const getExpectedSalaryPaymentsApi = () => {
  return fetch(`${API.baseUrl}/users/statistics/expected-salary-payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    } as HeadersInit,
  }).then(handleResponse);
};
