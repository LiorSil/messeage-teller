import * as yup from 'yup';

export const phoneNumberSchema = yup
    .string()
    .matches(/^05\d{0,8}$/, "Phone number must start with '05' and contain up to 10 digits.")
    .required();
