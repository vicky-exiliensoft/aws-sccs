"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation"; // Fixed import path
import { loginApi } from "@/utility/apis";
import * as Yup from "yup"; // Import Yup for form validation
import Link from "next/link";
import { FaUser, FaLock, FaExclamationTriangle, FaRegUser } from "react-icons/fa"; // Import Font Awesome icons
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email: string; password: string }>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({ email: "", password: "" });
      return true;
    } catch (validationErrors: any) {
      const newErrors: { [key: string]: string } = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path as keyof FormData] = error.message;
      });
      //@ts-ignore
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

    try {
      const response = await loginApi(formData);
      // console.log("Login successful:", response);
      localStorage.setItem("token", response.token);
      router.push("/home");
    } catch (error: any) {
      if (error.response) {
        // console.error("Login error:", error.response.data);
      } else {
        // console.error("Login error:", error.message);
      }
    }
  };

  return (
    <section className="login-sec">
      <Container fluid>
        <Row className="justify-content-center align-items-center divide-y-1">
          <Col md={4}>
            <Form className="bg-dark shadow rounded px-4 pt-4 pb-4 mb-4 divide-y-2" onSubmit={handleSubmit}>
              <Image src={"../logo-square.svg"} alt="logo" width={80} height={200} className="img-fluid d-block mx-auto" />
              <h1 className="text-center mb-5 text-white fw-medium">Sign In</h1>
              <Form.Group>
                {/*
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                */}
                <Form.Label>Email</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <CiMail />
                  </span>
                  <Form.Control
                    className={`${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    <FaExclamationTriangle /> {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <CiLock />
                  </span>
                  <Form.Control
                    className={`${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    <FaExclamationTriangle /> {errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Button className="py-2 px-4 rounded focus:outline-none focus:shadow-outline w-75 d-block mx-auto mt-5" type="submit">
                Login
              </Button>
              <div className="d-flex justify-content-center mb-1 gap-1 align-items-center text-white">
                Forget password?
                <Link href={"/forget"}>Click Here</Link>
              </div>
              <Link href={"/register"} className="text-decoration-underline d-block text-center">
                Create an Account
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
