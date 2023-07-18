export default function Validation(values) {
  const errors = [];
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  if (values.uname === "") {
    errors.uname = "Username is required";
  }
  if (values.password === "") {
    errors.password = "Password is required";
  }
  if (values.name === "") {
    errors.name = "Fullname  is required";
  }
  if (values.email === "") {
    errors.email = "Email is required";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Email didnot match";
  }
  return errors;
}
