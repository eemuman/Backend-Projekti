import React from "react";
import { alpha } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ModalBase from "./ModalBase";

import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import NewWord from "./NewWord";

/**
 * Sanojen yläpalkin hallintaelementti. Tämän avulla voidaan luoda uusia sanoja sekä muokata vanhoja. Kun jotain elementtiä listassa painetaan, sen id lähetetään tänne ja haluttu sana haetaan editwWordiin.
 * @param {*} props
 * @returns
 */
export default function WordHeader(props) {
  const numSelected = props.numSelected;

  const editWord = props.allWords.find((word) => word.id === props.selectedId);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          SANA VALITTU
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          SANAT
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Muokkaa">
            <div>
              <ModalBase
                btnTitle="Muokkaa valittua sanaa"
                title="MUOKKAA SANAA"
                isIcon={true}
                variant={<EditIcon fontSize="large" />}
                size="small"
                form={
                  <NewWord
                    fetchAll={props.fetchAll}
                    langs={props.langs}
                    themes={props.themes}
                    editWord={editWord}
                    isEdit={true}
                  />
                }
              />
            </div>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Lisää uusi sana">
          <div>
            <ModalBase
              btnTitle="LUO UUSI SANA"
              title="LUO UUSI SANA"
              isIcon={true}
              variant={<AddIcon fontSize="large" />}
              form={
                <NewWord
                  fetchAll={props.fetchAll}
                  langs={props.langs}
                  themes={props.themes}
                  isEdit={false}
                />
              }
            />
          </div>
        </Tooltip>
      )}
    </Toolbar>
  );
}
