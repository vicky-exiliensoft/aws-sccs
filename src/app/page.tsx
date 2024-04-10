import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Container fluid className="bg-black">
        <Row className="justify-content-center align-items-center coming-soon-section divide-y-1">
          <Col md={10} className="text-center">
            <Image src={"../logo.svg"} alt="logo" width={500} height={500} className="img-fluid" />
            <h1 className="text-white heading-style text-uppercase mt-2"> available soon </h1>
            <h4 className="text-white mt-3">Our website is under construction</h4>
          </Col>
        </Row>
      </Container>
    </>
  );
}
