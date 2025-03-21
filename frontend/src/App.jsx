import { useState, useEffect } from "react";
import AddImage from "./AddImage";
import ImageList from "./ImageList";
import { Container } from "react-bootstrap";
import axios from "axios";

function App() {
  const [images, setImages] = useState([]);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/image/${id}`);
      if (response.status === 200) {
        alert(response.data.message);
      }
      fetchImages();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/images");
      if (response.status === 200) {
        setImages(response.data);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <>
      <Container className="mt-5">
        <AddImage onAdd={fetchImages} />
        {images && images.length > 0 ? (
          <ImageList images={images} onDelete={deleteHandler} />
        ) : (
          <>
            <p>No images to show</p>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
