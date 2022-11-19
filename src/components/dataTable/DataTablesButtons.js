import React, { useContext } from 'react';
import { Add, Article, Delete, Edit } from '@mui/icons-material';

import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import DataTableContext from 'context/DataTableContext';

const DataTablesButtons = ({ data, buttons }) => {
  const { remove, edit, detail, add } = buttons || {};

  const location = useLocation().pathname;

  const { disableButton, disabledButtons, handleOpenDialog, setOpenDialog } = useContext(DataTableContext) || {};

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {detail && (
        <Button aria-label="detalle" component={Link} to={`${location}/detalle/${data.id}`}>
          <Article color="primary" />
        </Button>
      )}
      {edit && (
        <Button aria-label="modificar" component={Link} to={`${location}/modificar/${data.id}`}>
          <Edit color="warning" />
        </Button>
      )}
      {/* () => setIsOpen(true) */}
      {remove && (
        <Button
          aria-label="eliminar"
          onClick={() => {
            setOpenDialog(true);
            handleOpenDialog(data.id);
          }}
        >
          <Delete color="error" />
        </Button>
      )}
      {add && (
        <Button
          aria-label="agregar"
          size="small"
          onClick={() => disableButton(data)}
          disabled={disabledButtons?.[data.id] || data.cantidad <= 0}
          startIcon={<Add />}
        >
          Agregar
        </Button>
      )}
    </div>
  );
};

export default DataTablesButtons;

DataTablesButtons.propTypes = {
  buttons: PropTypes.object,
  data: PropTypes.object,
};
