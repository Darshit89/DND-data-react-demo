// Import necessary React components and libraries
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";
import "./Component.css";

// Define an array of layout items
const layoutArr = [
  {
    id: 1,
    title: "Table",
    componenet: "table",
    type: "table",
  },
  {
    id: 2,
    title: "Image Viewer",
    componenet: "imageViewer",
    type: "imageViewer",
  },
];

// Functional component for the side menu
const SideMenu = ({ setLayoutData }) => {
  // State for controlling the visibility of the drawer
  const [state, setState] = React.useState({ left: false });

  // Function to toggle the drawer open and close
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift"))
      return;
    setState({ ...state, [anchor]: open });
  };

  // Function to handle drag start event
  const handleDragStart = (event, anchor, text) => {
    const dataString = JSON.stringify(text);
    event.dataTransfer.setData("text/plain", dataString);
    toggleDrawer(anchor, false)(event);
  };

  // JSX for the list of layout items in the drawer
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h3 className="menu-cen">Menu</h3>
      <Divider />
      <List>
        {layoutArr.map((text) => (
          <ListItem
            key={text.id}
            disablePadding
            draggable={true}
            unselectable="on"
            onDragStart={(event) => handleDragStart(event, anchor, text)}
          >
            <ListItemButton>
              <MenuBox name={text.type} setLayoutData={setLayoutData} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon sx={{ fill: "#fff" }} />
          </Button>
          <Drawer
            BackdropProps={{ invisible: true }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

// Prop type validation for SideMenu component
SideMenu.propTypes = {
  setLayoutData: PropTypes.func,
};

export default SideMenu;

// Functional component for the draggable menu items
export const MenuBox = ({ name, setLayoutData }) => {
  // Define the drag and drop properties
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: ItemTypes.BOX,
      item: { name },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          setLayoutData((prev) => [...prev, item]);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    };
  });

  // Set opacity based on dragging state
  const opacity = isDragging ? 0.4 : 1;
  
  return (
    <div data-testid={`box`} ref={drag} className="box-menu" style={{ opacity }}>
      {name}
    </div>
  );
};

// Prop type validation for MenuBox component
MenuBox.propTypes = {
  name: PropTypes.node,
  setLayoutData: PropTypes.func,
};
