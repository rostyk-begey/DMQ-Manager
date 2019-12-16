import React from 'react';
import { Formik } from 'formik';
import { LoginPage as TablerLoginPage } from 'tabler-react';

export const Login = ({ authLogin }) => {
  const handleFormSubmit = (
    { email, password },
    { setSubmitting, setErrors /* setValues and other goodies */ },
  ) => {
    authLogin(email, password);
  };

  const validateLoginValues = values => {
    // same as above, but feel free to move this into a class method now.
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={validateLoginValues}
      onSubmit={handleFormSubmit}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <TablerLoginPage
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
        />
      )}
    />
  );
};
