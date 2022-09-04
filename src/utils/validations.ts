import * as Yup from 'yup';

export const getSignInFormValidation = (): Yup.ObjectSchema<Record<string, any>> => {
  return Yup.object().shape({
    password: Yup.string()
      .required('Please enter the password.')
      .min(6, 'Password must be between 6 and 256 characters.')
      .max(256, 'Password must be between 6 and 256 characters.'),
    username: Yup.string()
      .required('Please enter your username.')
      .max(255, 'The username must be less than 255 characters'),
  });
};
