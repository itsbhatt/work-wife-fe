import { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Filters = (props) => {
  const { onFilter } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    source: '',
    status: '',
  });

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setFilters((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
  };

  const onClearFilter = (type) => () => {
    const tempFilters = { ...filters };

    if (type) {
      tempFilters[type] = '';
    } else {
      Object.keys(tempFilters).forEach(filterKey => {
        tempFilters[filterKey] = '';
      })
    }

    setFilters(tempFilters);
  }

  return (
    <>
      <Tooltip title="Filter list">
        <IconButton onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Box sx={{ px: 2, py: 1, width: 220 }}>
          <Typography sx={{ fontWeight: 500 }} variant="subtitle1">
            Filter
          </Typography>
          <Divider sx={{ my: 1 }} />

          <FormControl sx={{ mt: 2, width: '100%' }} size="small">
            <Typography gutterBottom>Status</Typography>
            <Select
              name="status"
              value={filters.status}
              onChange={handleChange}
              IconComponent={filters.status ? () => <CloseIcon style={{ cursor: 'pointer' }} sx={{ mr: 1, cursor: 'pointer' }} onClick={onClearFilter('status')} color="error" fontSize="small"/> : ArrowDropDownIcon}
            >
              <MenuItem value={10}>Pending</MenuItem>
              <MenuItem value={20}>Processed</MenuItem>
              <MenuItem value={30}>Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2, width: '100%' }} size="small">
            <Typography gutterBottom>Source</Typography>
            <Select
              name="source"
              value={filters.source}
              onChange={handleChange}
              IconComponent={filters.source ? () => <CloseIcon style={{ cursor: 'pointer' }} sx={{ mr: 1 }} onClick={onClearFilter('source')} color="error" fontSize="small"/> : ArrowDropDownIcon}
            >
              <MenuItem value={10}>Pending</MenuItem>
              <MenuItem value={20}>Processed</MenuItem>
              <MenuItem value={30}>Cancelled</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" sx={{ mt: 2 }} onClick={onFilter}>
            Apply
          </Button>

          <Button variant="outlined" color="error" sx={{ mt:2, mx: 2 }} onClick={onClearFilter()}>
            Clear
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default Filters;
