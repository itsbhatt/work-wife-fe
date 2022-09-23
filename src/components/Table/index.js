import { useState } from 'react';
import Axios from 'axios';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import TableToolbar from './components/TableToolbar';
import TableHeader from './components/TableHeader';
import { CircularProgress, Radio } from '@mui/material';

const parseData = (type, data) => {
  if (type === 'dateTime') {
    return dayjs(data).format('DD/MM/YYYY hh:mm A')
  }
  return data;
}

const TableWrapper = (props) => {
  const { title, columns, data, handleOpenSnackbar, loading, setLoading } = props;
  const [page] = useState(0);
  const [rowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [selected, setSelected] = useState('');

  const deselectOnClick = () => {
    setSelected('');
  };

  const handleClick = (_, name) => {
    setSelected(name);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const onDelete = async () => {
    const payloadData = data.find(col => col.trigger_time === selected);
    try {
      await Axios.post('/delete_task', {
        event_id: payloadData.event_id,
        trigger_time: payloadData.trigger_time,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      handleOpenSnackbar({
        open: true,
        message: 'YaY!! Feature coming soon!',
        type: 'info',
      });
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar title={title} numSelected={selected ? 1 : 0} onDelete={onDelete} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            size={dense ? 'small' : 'medium'}
          >
            <TableHeader
              numSelected={selected ? 1 : 0}
              columns={columns}
              deselectOnClick={deselectOnClick}
              rowCount={data.length}
            />
            <TableBody>
              {data.length === 0 && loading && (
                <TableRow sx={{ width: '100%'}}>
                  <TableCell colSpan={7}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', minHeight: 250 }}>
                      <CircularProgress sx={{ alignSelf: 'center' }} color="primary" />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {data.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${row.trigger_time}-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.trigger_time)}
                    role="checkbox"
                    aria-checked={row.trigger_time === selected}
                    tabIndex={-1}
                    key={row.trigger_time}
                    selected={row.trigger_time === selected}
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        color="primary"
                        checked={row.trigger_time === selected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {columns.map((col) => {
                      return (
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          key={row[col.id]}
                        >
                          {parseData(col.type, row[col.id])}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

TableWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableWrapper;