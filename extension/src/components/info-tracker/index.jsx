import React from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const InfoTracker = ({ envMap, openSettings, openWorkspaces }) => (
  <div style={{ marginTop: "16px" }}>
    <div style={{ fontSize: "1.2rem" }}>Env deployment info</div>
    <TableContainer component={Paper} style={{ marginTop: "8px" }}>
      <Table className={``}>
        <TableHead>
          <TableRow>
            <TableCell>Env</TableCell>
            <TableCell align={`right`}>Branch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(envMap).map(([envName, branch]) => (
            <TableRow key={envName}>
              <TableCell component={`th`} scope={`row`}>
                {envName}
              </TableCell>
              <TableCell align={`right`}>{branch}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{ marginTop: "16px" }}>
      <Button
        variant="outlined"
        style={{ marginRight: "16px" }}
        onClick={openSettings}
      >
        Settings
      </Button>
      <Button variant="outlined" onClick={openWorkspaces}>
        WorkSpaces
      </Button>
    </div>
  </div>
);

export default InfoTracker;
