"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { AiFillLock } from "react-icons/ai";
import Image from "next/image";
import { changPassword } from "@/utility/yupValidation";
import { forgetPassword } from "@/utility/apis"; // Importing forgetPass function

const Dashboard: React.FC = () => {
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await changPassword.validate(values, { abortEarly: false });

      // Obtain the user's email from the authentication context or session
      const userEmail = getUserEmail(); // Replace this with your actual implementation to get the user's email

      // Call forget password API
      const response = await forgetPassword({
        email: userEmail,
        //@ts-ignore
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmNewPassword,
      });

      // console.log(response); // Handle response accordingly
    } catch (err: any) {
      const newErrors: any = {};
      if (err.inner) {
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
      } else {
        newErrors["general"] = err.message; // Assigning a general error message if `err.inner` is undefined
      }
      setErrors(newErrors);
    }
  };

  // Dummy function, replace with your actual implementation
  const getUserEmail = () => {
    // Implement your logic to get the user's email here
    // Example: return user.email;
    return "user@example.com";
    // return email; // Dummy email for demonstration
  };

  return (
    <section className="login-sec">
      <Container fluid>
        <Row className="justify-content-center align-items-center divide-y-1">
          <Col md={4}>
            <Form className="bg-dark shadow rounded px-4 pt-4 pb-4 mb-4 divide-y-2" onSubmit={handleSubmit}>
              <Image src={"../logo-square.svg"} alt="logo" width={80} height={200} className="img-fluid d-block mx-auto" />
              <h1 className="text-center mb-5 text-white fw-medium">Change Password</h1>
              {/* Current password input */}
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>Current Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <AiFillLock />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Current Password"
                    name="currentPassword"
                    value={values.currentPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.currentPassword && <div className="text-danger">{errors.currentPassword}</div>}
              </Form.Group>
              {/* New password input */}
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>New Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <AiFillLock />
                  </span>
                  <Form.Control type="password" placeholder="New Password" name="newPassword" value={values.newPassword} onChange={handleChange} />
                </div>
                {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
              </Form.Group>
              {/* Confirm new password input */}
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <AiFillLock />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Confirm New Password"
                    name="confirmNewPassword"
                    value={values.confirmNewPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmNewPassword && <div className="text-danger">{errors.confirmNewPassword}</div>}
              </Form.Group>
              {/* Submit button */}
              <Button className="py-2 px-4 rounded focus:outline-none focus:shadow-outline w-75 d-block mx-auto mt-5" type="submit">
                Change Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
