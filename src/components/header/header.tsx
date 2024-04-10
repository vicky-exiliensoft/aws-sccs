import { useRouter } from "next/navigation";
import axiosInstance from "@/utility/axiosInstance";
import { useState, useEffect } from "react";
import { Nav, Navbar, Container, Modal } from "react-bootstrap";
import { FaExchangeAlt, FaUser, FaCog, FaPowerOff } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("/api/profile");
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  const [totalBalance, setTotalBalance] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomBalance = Math.random() * 1000;
      setTotalBalance(randomBalance);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar expand="lg" className="border sticky-top bg-white">
        <Container>
          <Navbar.Brand href="#home" className="p-0">
            <Image src="/logo.svg" alt="logo" width={120} height={120} />
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <div className="d-flex justify-content-center" style={{ marginRight: "731px" }}>
              <h4 className="m-0 text-primary">
                <span className="text-secondary">$</span>0.00
              </h4>
              {/* {totalBalance.toFixed(2)} */}
            </div>
            <Nav.Link href="/connect">
              <FaExchangeAlt className="text-secondary" />
            </Nav.Link>
            <Nav.Link onClick={handleProfileClick} className="auth-img rounded-circle border border-white transition-x">
              <FaUser className="text-primary" />
            </Nav.Link>
            <Nav.Link href="/settings" className="auth-img rounded-circle border border-white transition-x">
              <FaCog className="rotate" />
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="auth-img rounded-circle border border-white transition-x">
              <FaPowerOff className="text-danger" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modal show={showProfileModal} onHide={handleCloseProfileModal} centered>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title className="text-center text-danger">User Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ border: "none" }}>
            {loading ? (
              <p>Loading profile...</p>
            ) : (
              <div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Name:</strong> {profileData?.user.name}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Email:</strong> {profileData?.user.email}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Role:</strong> {profileData?.user.role}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Permissions:</strong> {profileData?.user.permissions}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Last Login Time:</strong> {profileData?.user.lastLoginTime}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Role:</strong> {profileData?.user.creationDate}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Registration Time:</strong> {profileData?.user.registrationTime}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>
                      <strong>Location:</strong> {profileData?.user.location}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
}
