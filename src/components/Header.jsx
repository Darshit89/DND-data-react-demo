import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Component.css";

// Functional component Header with a prop called setLayoutData
const Header = ({ setLayoutData }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Material UI AppBar for the header */}
      <AppBar position="static">
        <Toolbar>
          {/* SideMenu component for a menu on the side */}
          <SideMenu setLayoutData={setLayoutData} />
          {/* Typography component for the title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Drag and Drop
          </Typography>
          {/* Link component for navigation to the 'simpleForm' route */}
          <Link to={`simpleForm`} className="link-color">
            Simple Form
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

// PropTypes validation for the Header component
Header.propTypes = {
  setLayoutData: PropTypes.func, // setLayoutData prop should be a function
};

export default Header; // Exporting the Header component as the default export
