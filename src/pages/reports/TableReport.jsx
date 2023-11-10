import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const styleTableCell = {
  '@media print': {
    padding: '0.3rem',
    fontSize: '13px',
  },
};

const TableReport = ({ columns = [], rows = [], showAllRows }) => {
  return (
    <TableContainer sx={{ paddingTop: '1rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ displayLabel }, index) => (
              <TableCell key={index} align="center">
                {displayLabel}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={showAllRows && index >= 10 ? { display: 'none', displayPrint: 'table-row' } : {}}>
              {columns.map(({ key }, index) => (
                <TableCell key={index + key} align="center" scope="row" sx={styleTableCell}>
                  {row?.[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableReport.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  showAllRows: PropTypes.bool,
};

export default TableReport;
