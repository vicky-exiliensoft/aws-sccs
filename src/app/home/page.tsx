"use client"
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LineChart from "./chart"; // Import LineChart component
import Btclivechart from "./tradinView";
import axiosInstance from "@/utility/axiosInstance";
import {Header } from "@/components";
import { useRouter } from "next/navigation";

// Define Dashboard component
const Dashboard: React.FC = () => {
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);
  const [showSellBTCModal, setShowSellBTCModal] = useState<boolean>(false);
  const [showAllOrdersModal, setShowAllOrdersModal] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/profile");
        setProfileData(response.data);
      } catch (error) {
        // Handle error fetching profile data
      }
    };

    fetchData();
  }, []);

  // Show disclaimer modal on page load
  useEffect(() => {
    setShowPromptModal(true);
  }, []);

  return (
    <>
      <div className="main-content">
        <Header />
        <Btclivechart />
        <LineChart />
       
      </div>

      {/* Modals */}
      {/* Prompt Modal */}
      <Modal show={showPromptModal} onHide={() => setShowPromptModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Disclaimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Trading involves risks and may not be suitable for everyone. Past performance is not indicative of future results. Before trading, carefully consider your investment objectives, experience level, and risk tolerance. You could lose some or all of your investment.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowPromptModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Sell BTC Modal */}
      <Modal show={showSellBTCModal} onHide={() => setShowSellBTCModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>No BTC Orders Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>No BTC Orders Found</h3>
          <p>$0.00 No trade open.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSellBTCModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* All Orders Modal */}
      <Modal show={showAllOrdersModal} onHide={() => setShowAllOrdersModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Available</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You can see orders after 24 hours once you have placed them.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAllOrdersModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
// EXPORTING THE FUNCTION  
export default Dashboard;
