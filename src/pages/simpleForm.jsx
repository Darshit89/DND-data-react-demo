// Importing necessary dependencies and styles
import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "../components/Component.css"; // Importing CSS styles

// Defining the 'SimpleForm' functional component
const SimpleForm = () => {
  // State variables initialization
  const [open, setOpen] = useState(false);
  const [snackbars, setSnackbars] = useState([]);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Function to handle input changes in the 'name' field
  const handleInput = (e) => {
    setName(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (count === 0) setOpen(true); // Open the Snackbar for the first submission
    setSnackbars([...snackbars, count]); // Add a new Snackbar message to the list
    setCount(count + 1); // Increment the count
    setName(""); // Clear the input field
  };

  // Function to handle closing of the Snackbar
  const handleClose = () => {
    if (snackbars.length > 1) {
      const updatedCounts = [...snackbars];
      updatedCounts.pop(); // Remove the last message
      setSnackbars(updatedCounts); // Update the Snackbar messages
      setCount(updatedCounts.length); // Update the count
      setName(""); // Clear the input field
    } else {
      setOpen(false); 
      setSnackbars([]); 
      setCount(0); 
      setName(""); 
    }
  };

  // Rendering the component
  return (
    <Container maxWidth="sm">
      {/* Form for input */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          name="name"
          value={name}
          onChange={handleInput}
        />
        <Link to={`/`} className="link-back">
          <Button variant="contained">Back</Button>
        </Link>{" "}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {snackbars.map((snackbarIndex) => (
        <Snackbar
          sx={{
            ".MuiPaper-root": {
              boxShadow: "none",
            },
          }}
          key={snackbarIndex}
          open={open}
          message={`Note archived (${1} of ${count})`}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      ))}
    </Container>
  );
};

// Exporting the 'SimpleForm' component as the default export
export default SimpleForm;
