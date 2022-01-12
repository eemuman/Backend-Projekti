import React from "react";

import TableCell from "@mui/material/TableCell";
import { TableSortLabel } from "@mui/material";
import { Box } from "@mui/system";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { visuallyHidden } from "@mui/utils";

/**
 * Sanojen näyttämisen yläpalkki jossa on kaikki eri vaihtoehdot (id,theme_id,kielet). Painamalla näitä järjestellään datat uudestaan halutulla tavalla.
 * @param {*} props
 * @returns Yläpalkki-elementti
 */
export default function SortableHeader(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {Object.keys(props.headCells).map((headCell) => (
          <TableCell
            key={headCell}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : "asc"}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
