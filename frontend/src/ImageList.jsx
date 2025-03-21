import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ImageList = ({ images, onDelete }) => {
  return (
    <Container className="mt-5">
      <Row>
        {images.map((item) => (
          <Col xs={12} md={3} className="mb-5" key={item.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                style={{
                  height: "200px",
                  width: "287px",
                  overflow: "hidden",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                variant="top"
                src={item.imageUrl}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="danger" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageList;
