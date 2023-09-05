// Importing necessary dependencies and styles
/* eslint-disable no-unused-vars */
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { Grid } from "@mui/material";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Header from "./components/Header";
import { useState } from "react";
import ImageViewer from "./components/ImageViewer";
import "./components/Component.css";
import BasicTable from "./components/BasicTable.jsx";

// Defining the main 'App' functional component
const App = () => {
  // State variables initialization
  const [cardOneData, setCardOneData] = useState();
  const [layoutData, setLayoutData] = useState([]);

  const url = "https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids";

  // Creating a data store using AspNetData
  const tasksStore = AspNetData.createStore({
    key: "ID",
    loadUrl: `${url}/Tasks`,
    updateUrl: `${url}/UpdateTask`,
    onBeforeSend(method, ajaxOptions) {
      ajaxOptions.xhrFields = { withCredentials: true };
    },
  });

  // Setting up a drop target using 'useDrop' hook
  const [, drop] = useDrop(() => {
    return {
      accept: ItemTypes.BOX,
      drop: () => ({ name: "Layout" }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    };
  });

  // Function to handle dragging and dropping data
  const handleDrag = (event) => {
    event.preventDefault();
    const dataString = event.dataTransfer.getData("text/plain");
    const droppedData = JSON.parse(dataString);
    setCardOneData(droppedData);
  };

  // Function to allow dropping elements
  function allowDrop(event) {
    event.preventDefault();
  }

  // Rendering the component
  return (
    <>
      {/* Rendering the Header component */}
      <Header setLayoutData={setLayoutData} />
      <h1>DnD & Toaster</h1>
      {/* Creating a drop target container */}
      <div ref={drop} data-testid="Layout">
        {/* Creating a grid layout */}
        <Grid container spacing={2} sx={{ height: "700px" }}>
          {/* Mapping through layoutData and rendering components based on their names */}
          {layoutData.length > 0 &&
            layoutData.map((item, index) => {
              return (
                <Grid item xs={6} key={`layouts - ${index}`}>
                  <div
                    className="layout-grid"
                    onDrop={handleDrag}
                    onDragOver={allowDrop}
                  >
                    {item.name === "table" ? (
                      <BasicTable />
                    ) : item.name === "imageViewer" ? (
                      <ImageViewer />
                    ) : (
                      <></>
                    )}
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </>
  );
};

// Exporting the 'App' component as the default export
export default App;
