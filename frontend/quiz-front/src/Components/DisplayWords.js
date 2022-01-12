import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WordPagination from "./WordPagination";
import WordHeader from "./WordHeader";
import SortableHeader from "./SortableHeader";

/**
 * Tämä on sanojen listaamiseen hallintapaneelissa käytettävä elementti
 */
export default function DisplayWords(props) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  /**
   * Tämän avulla järjestetään listat halutun elementin mukaan
   * @param {} event Mikä triggeröi
   * @param {*} property Mitä @WordHeader elementtiä painettiin
   */
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  /**
   * Avustusfunktio sanojen oikean järjestyksen hakuu
   * @param {*} a
   * @param {*} b
   * @param {*} orderBy
   * @returns 1 tai -1
   */
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  /**
   * Haetaan haluttu järjestys
   * @param {*} order
   * @param {*} orderBy
   * @returns Järjestys
   */
  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props.allWords.length)
      : 0;

  /**
   * Kun vaihdetaan paginationin sivua, tämä vaihtaa staten halutulle sivulle
   * @param {*} event millä vaihdettini
   * @param {*} newPage uuden sivun numero
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Tämän avulla vaihdetaan montako sanaa nähdän kerralla paginationissa
   * @param {*} event  mikä triggeröi
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * haetaan sen elementin indexi mitä on painettu.
   * @param {*} name elementin nimi
   * @returns elementin indeksin
   */
  const isSelected = (name) => selected.indexOf(name) !== -1;

  /**
   * Handlataan elementin klikkaus
   * @param {*} event
   * @param {*} name  mmitä klikattu
   */
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(name);
    }

    setSelected(newSelected);
  };

  return (
    <TableContainer component={Paper}>
      <WordHeader
        numSelected={selected.length}
        selectedId={selected[0]}
        {...props}
      />
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <SortableHeader
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={props.allWords.length}
          headCells={props.allWords[0]}
        />
        <TableBody>
          {(rowsPerPage > 0
            ? props.allWords
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.allWords.sort(getComparator(order, orderBy))
          ).map((row, index) => {
            const isItemSelected = isSelected(row.id);
            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                key={index}
                tabIndex={-1}
                selected={isItemSelected}
              >
                {Object.entries(row).map(([key, value], index) => (
                  <TableCell key={index} style={{ width: 160 }}>
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
              count={props.allWords.length}
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
