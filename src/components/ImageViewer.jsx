// Importing the 'useState' hook from React and the component's CSS styles
import { useState } from "react";
import "../components/Component.css";

// Defining the 'ImageViewer' functional component
const ImageViewer = () => {
  const [image, setImage] = useState("");

  // Function to handle dropping an image
  const handleDrop = (event) => {
    let img = event.dataTransfer.getData("text/plain");
    let imageSet = JSON.parse(img);
    setImage(imageSet.name);
  };

  // Rendering the component
  return (
    <div onDrop={handleDrop} className="ht-div">
      <h2>ImageViewer</h2>

      {image ? <img src={`src/assets/${image}.jpeg`} alt="image" /> : <></>}
    </div>
  );
};

export default ImageViewer;
