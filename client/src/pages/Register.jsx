import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, Link } from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../../../utils/customFetch.js";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successfully");
    return redirect("/login");
    // return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  // console.log(data);
  // return null
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue={"john"} />
        <FormRow type="text" name="lastName" labelText="LastName" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="email" name="email" labelText="E-mail" />
        <FormRow type="password" name="password" labelText="password" />
        <SubmitBtn formBtn />
        <p>
          Already a user?
          <Link to="/login" className="member-btn">
            Login{" "}
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
