import { TextField, Button } from "@mui/material";
import { FC, useMemo, useState } from "react";
import "./LoginForm.css";

interface LoginFormProps {}

interface FormDataValues {
  email: string;
  password: string;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const [formData, setFormData] = useState<FormDataValues>({
    email: "",
    password: "",
  }); //state to manage form data
  const [emailError, setEmailError] = useState<string>(); //state to manage email input error
  const [passwordError, setPasswordError] = useState<string>(); //state to manage password input error

  const onFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    //function to handle form submission logic
    e.preventDefault();

    const emailErrorMessage = handleEmailErrorMessage(formData.email);
    setEmailError(emailErrorMessage);

    const passwordErrorMessage = handlePasswordErrorMessage(formData.password);
    setPasswordError(passwordErrorMessage);

    if (!emailErrorMessage && !passwordErrorMessage) {
      //if all data passes validation => send API request to complete authentication
      return;
    }
  };

  const isValidEmail = (email: string) => {
    //check if email is valid using regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailErrorMessage = (email?: string) => {
    //function to handle what email validation error message (if any) to show
    if (!email) return "Please enter email";
    if (!isValidEmail(email)) return "Please enter valid email";
    return "";
  };

  const handlePasswordErrorMessage = (password?: string) => {
    //function to handle what password validation error message (if any) to show
    if (!password) return "Please enter password";
    return "";
  };

  const handleEmailInput = (
    //onChange event to set email
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordInput = (
    //onChange event to set password
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <form className="loginForm" onSubmit={(e) => onFormSubmission(e)}>
      <div id="emailTextField">
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={(e) => handleEmailInput(e)}
          error={Boolean(emailError)}
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <div id="passwordTextField">
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => handlePasswordInput(e)}
          error={Boolean(passwordError)}
        />
        {passwordError && <p>{passwordError}</p>}
      </div>
      <div id="loginButton">
        <Button
          variant="contained"
          type="submit"
          sx={{
            paddingX: "26px",
            paddingY: "6px",
          }}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
