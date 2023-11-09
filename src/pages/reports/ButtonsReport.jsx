import PropTypes from 'prop-types';

import { Box, Button } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { TableView } from '@mui/icons-material';
import { download, generateCsv, mkConfig } from 'export-to-csv';

export const ButtonsReport = ({ columnsCSV, handlePrint, dataCSV, filename }) => {
  const handleClick = () => {
    const csvConfig = mkConfig({ columnHeaders: columnsCSV, filename });
    const csv = generateCsv(csvConfig)(dataCSV);
    download(csvConfig)(csv);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        displayPrint: 'none',
      }}
    >
      <Button type="button" startIcon={<PictureAsPdf />} variant="outlined" onClick={handlePrint} color="secondary">
        Reporte en PDF
      </Button>
      <Button startIcon={<TableView />} variant="outlined" color="secondary" onClick={handleClick}>
        Reporte en CSV
      </Button>
    </Box>
  );
};

ButtonsReport.propTypes = {
  columnsCSV: PropTypes.array,
  handlePrint: PropTypes.func,
  dataCSV: PropTypes.array,
  filename: PropTypes.string,
};
