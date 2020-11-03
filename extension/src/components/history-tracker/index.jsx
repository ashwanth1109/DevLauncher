import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const HistoryTracker = ({ envName, history }) => (
  <div style={{ marginTop: "16px" }}>
    <div style={{ fontSize: "1.2rem" }}>Current env history ({envName}):</div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Commit Hash</TableCell>
            <TableCell align="right">Options Run</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(history[envName] || []).map((historyItem) => (
            <TableRow key={historyItem.date}>
              <TableCell>
                {new Date(historyItem.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{historyItem.hash}</TableCell>
              <TableCell>
                {historyItem.runOptions.map((option) => (
                  <div key={historyItem.date + option}>{option}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default HistoryTracker;
