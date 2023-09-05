import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DragHandleIcon from "@mui/icons-material/DragHandle";

// Function to create data rows
function createData(name, age, time) {
  return { name, age, time };
}

// Sample data rows
const rows = [
  createData("cat", 2, "3:00"),
  createData("dog", 3, "5:00"),
  createData("lion", 5, "6:00"),
  createData("tiger", 7, "2:00"),
  createData("cow", 3, "1:00"),
];

// React component for the basic table
export default function BasicTable() {
  // Function to handle drag start event
  const handleDragStart = (event, row) => {
    const dataString = JSON.stringify(row);
    event.dataTransfer.setData("text/plain", dataString);
  };

  return (
    <>
      {/* Header */}
      <h2>Basic Table</h2>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapping over data rows */}
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Drag handle cell */}
                <TableCell align="center">
                  <div
                    onDragStart={(e) => handleDragStart(e, row)}
                    draggable
                    style={{ cursor: "move" }}
                  >
                    <DragHandleIcon />
                  </div>
                </TableCell>

                {/* Data cells */}
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
