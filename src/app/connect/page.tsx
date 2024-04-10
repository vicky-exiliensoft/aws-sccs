"use client"
import React, { useState, useEffect } from "react";
// import axiosInstance from "@/utility/axiosInstance";
// import Sidebar from "@/app/sidebar/page";
// import Sidebar from "@/app/sidebar/page";
 
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Swal from "sweetalert2";
import { Footer, Header } from "@/components";
import { GrConnect } from "react-icons/gr";
import { MdOutlinePrivacyTip } from "react-icons/md";
// import { TbApiApp } from "react-icons/tb";

const Connect: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <div className="main-content">
      <Header />
      <Container>
        <Row className="justify-content-center align-items-center divide-y-1 content-height">
          <Col md={6}>
            <Form className="bg-dark shadow rounded px-4 pt-4 pb-4 mb-4 divide-y-2">
              {/* <Image src={"../logo-square.svg"} alt="logo" width={80} height={200} className="img-fluid d-block mx-auto" /> */}
              <h1 className='text-white text-center my-4 bold d-flex gap-2 align-items-center justify-content-center text-capitalize'>
                <small className='text-secondary'>API</small>
                Connection
              </h1>
              {/* <h3 className="mt-4 mb-4">Connect manually</h3> */}
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label className="text-dark">Api key</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><GrConnect /></span>
                  <Form.Control type="password" placeholder="Api key" />
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label className="text-dark">Secret key</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><MdOutlinePrivacyTip /></span>                 
                  <Form.Control type="password" placeholder="Secret key" />
                </div>
              </Form.Group>
              <Row className="align-items-center">
                <Col>
                  {/* <Form.Group as={Row} className="text-center" controlId="formPlaintextEmail"> */}
                    <Link
                      href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2Fgsi%2Fselect%3Fclient_id%3D574357672194-2g6qsuvfhfq8957a7al8ihg9p59ggrcn.apps.googleusercontent.com%26ux_mode%3Dpopup%26ui_mode%3Dcard%26as%3DZeNAd4rLjBzobRdxZFTPjw%26channel_id%3Df47a11e7272282a25559c3b5ac24d553b2eb26cc0078c3469bc104fff4382c8a%26origin%3Dhttps%3A%2F%2Fwww.lbank.com&faa=1&ifkv=ATuJsjy9sA1ebHcQTZBVkr8nCtrNuKB1uiKYcKY1fyZImZqWZG8HMW1ed5KDwCSwp2xvbuNhhoqy&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S638283583%3A1708926047115646&theme=glif"
                      passHref
                      title="connect to LBank API"
                    >
                      {/* <TbApiApp /> */}
                      <Button className="py-2 px-4 rounded focus:outline-none focus:shadow-outline w-75 d-block mx-auto mt-4">Connect to LBank API</Button>
                    </Link>
                  {/* </Form.Group> */}
                </Col>
                <Col>
                  <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Button
                      // variant="danger"
                      // variant="warning"
                      type="submit"
                      className="btn-secondary py-2 px-4 rounded focus:outline-none focus:shadow-outline w-75 d-block mx-auto mt-4"
                      onClick={(event) => {
                        event.preventDefault(); // Prevent default form submission behavior
                        Swal.fire({
                          icon: "warning",
                          title: "Secure Connection Can't Be Established!",
                          text: "Your API keys have been securely connected.",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            // Submit the form here
                          }
                        });
                      }}
                    >
                      Secure Connection
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>          
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Connect;