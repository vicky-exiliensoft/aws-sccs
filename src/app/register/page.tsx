"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { calculatePremiumApi } from "@/utility/apis"; // Adjust the paths accordingly
import Link from "next/link";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import * as Yup from "yup"; // Import Yup for form validation
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Import Font Awesome icons
import Image from "next/image";
import { CiLock, CiMail, CiUser } from "react-icons/ci";

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    password: "password123",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await calculatePremiumApi(formData);
      // console.log("Registration successful:", response.data);
      router.push("/login");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        //@ts-ignore
        const newErrors: FormErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path as keyof FormErrors] = err.message;
        });
        setErrors(newErrors);
      } else {
        // console.error("Registration error:", error.message);
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
              <h1 className="text-center mb-5 text-white fw-medium">Sign Up</h1>
              <Form.Group className="col-mb-12">
                <Form.Label>Name</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <CiUser />
                  </span>
                  {/* Icon for name */}
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    id="name"
                    isInvalid={!!errors.name}
                  />
                </div>
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <CiUser />
                  </span>
                  {/* Icon for username */}
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    id="username"
                    isInvalid={!!errors.username}
                  />
                </div>
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <CiMail />
                  </span>
                  {/* Icon for email */}
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    isInvalid={!!errors.email}
                  />
                </div>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <CiLock />
                  </span>
                  {/* Icon for password */}
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    id="password"
                    isInvalid={!!errors.password}
                  />
                </div>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="py-2 px-4 rounded focus:outline-none focus:shadow-outline w-75 d-block mx-auto mt-5">
                Register
              </Button>
              <div className="d-flex justify-content-center mb-1 gap-1 align-items-center text-white">
                Already have an account?
                <Link href={"/login"}>Login</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
