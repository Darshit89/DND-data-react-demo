// Importing necessary dependencies and styles
import { useEffect, useState } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./Component.css";

// Creating a ResponsiveReactGridLayout component using WidthProvider
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Defining the GridLayoutCpm functional component
const GridLayoutCpm = () => {
  // State variables initialization
  const [layouts] = useState({
    lg: _.map(_.range(0, 2), function (item, i) {
      var y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (_.random(0, 5) * 2) % 2,
        y: Math.floor(i / 6) * y,
        w: 1,
        h: 0.2,
        i: i.toString(),
      };
    }),
  });

  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);
  const [toolbox, setToolbox] = useState({ lg: [] });

  // Effect hook to set 'mounted' state to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle breakpoint changes
  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
    });
  };

  // Function to generate DOM elements based on layouts
  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      return (
        <div
          key={i}
          className={(l.static ? "static" : "") + "dom-bg"}
        >
          <span
            className="text"
            title="This item is static and cannot be removed or resized."
          >
            {i}
          </span>
        </div>
      );
    });
  };

  // Rendering the ResponsiveReactGridLayout component with generated DOM elements
  return (
    <ResponsiveReactGridLayout
      className="responsive-bg"
      layouts={layouts}
      useCSSTransforms={mounted}
      preventCollision={!compactType}
      onBreakpointChange={onBreakpointChange}
      isDroppable
    >
      {generateDOM()}
    </ResponsiveReactGridLayout>
  );
};

export default GridLayoutCpm;
