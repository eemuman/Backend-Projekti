import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import WordPagination from "./WordPagination";
import WordHeader from "./WordHeader";

export default function DisplayWords(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.words.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(name);
    }

    console.log(newSelected);

    setSelected(newSelected);
  };

  return (
    <TableContainer component={Paper}>
      <WordHeader numSelected={selected.length} />
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {Object.entries(props.words[0]).map(([key]) => (
              <TableCell align="center">{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? props.words.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.words
          ).map((row) => {
            const isItemSelected = isSelected(row.id);
            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                key={row.name}
                tabIndex={-1}
                selected={isItemSelected}
              >
                {Object.entries(row).map(([key, value]) => (
                  <TableCell style={{ width: 160 }} align="center">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={props.words.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={WordPagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
