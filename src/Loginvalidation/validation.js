const validation = (values) => {
  //console.log(values);
  let errors = {};
  if (!values.name) {
    errors.name = {};
    if (!values.name) {
      errors.name = "Username is Required";
    } else if (values.name.length < 5) {
      errors.name = "Username must be morethan 5   characters";
    }
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 5) {
    errors.password = "Password must be morethan 5 characters";
  }
  return errors;
};

export default validation;
