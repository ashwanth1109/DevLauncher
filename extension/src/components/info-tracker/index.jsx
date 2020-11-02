import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const InfoTracker = ({ envMap }) => (
  <div style={{ marginTop: "16px" }}>
    <div style={{ fontSize: "1.2rem" }}>Current env deployment info</div>
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
  </div>
);

export default InfoTracker;
