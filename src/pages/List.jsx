import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const List = () => {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState(null); // Initialize to null
  const firebase = useFirebase();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

   await firebase.createNewListing(name, isbnNumber, price, coverPic)
  };

  return (
    <div className="container">
      <Form
        style={{ width: "50%", justifyContent: "center", alignItems: "center" }}
        encType="multipart/form-data" // Add enctype attribute for file uploads
        onSubmit={handleSubmit} // Bind the form submission handler
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h1>Bookify App</h1>
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            type="text"
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>CoverPic</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default List;
