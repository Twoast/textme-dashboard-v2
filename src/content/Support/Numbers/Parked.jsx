import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { withTheme } from '@mui/styles';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';

import withPaginatedApi from 'src/components/Content/APIPage';
import ConfirmationDialog from 'src/components/Dialog/ConfirmationDialog';

const API_ENDPOINT = 'phone_numbers/parked';
const ParkedNumberComponent = (props) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleUnparkNumberEvent = (data) => {
    setOpen(false);

    switch (data.action) {
      case 'Unpark':
        let new_data = data.props.apiData.filter((phoneNumber) => phoneNumber.phone_number != data.phone_number);
        data.props.setApiData(new_data);
        toast.success(`${data.phone_number} unparked`);
        break;
      case 'dismiss':
      default:
        break;
    }
  };

  const buildUnparkModalData = (phoneNumber, props) => ({
    title: `Are you sure you want to unpark this number ?`,
    content: (
      <>
        <ReactCountryFlag countryCode={phoneNumber.iso_country} /> {phoneNumber.phone_number}
      </>
    ),
    acceptButtonText: 'Unpark',
    phone_number: phoneNumber.phone_number,
    props: props,
  });

  return (
    <Card>
      <Card>
        <CardHeader title="Parked Numbers" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number #</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ConfirmationDialog open={open} handleDialogResponse={handleUnparkNumberEvent} data={modalData} />
              {props.apiData.map((phoneNumber, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        style={{ width: 150 }}
                      >
                        {props.isLoading ? <Skeleton /> : phoneNumber.phone_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap style={{ width: 70 }}>
                        {props.isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <ReactCountryFlag countryCode={phoneNumber.iso_country} /> <small>({phoneNumber.iso_country})</small>
                          </>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {props.isLoading ? (
                        <Skeleton />
                      ) : (
                        <>
                          <Tooltip title="Unpark number" arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: props.theme.colors.primary.lighter,
                                },
                                color: props.theme.palette.primary.main,
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setModalData(buildUnparkModalData(phoneNumber, props));
                                setOpen(true);
                              }}
                            >
                              <LockOpenOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          {props.isLoading ? (
            <Skeleton />
          ) : (
            <TablePagination
              component="div"
              count={props.apiDataCount}
              onPageChange={props.handlePageChange}
              onRowsPerPageChange={props.handleLimitChange}
              page={props.pageLimit.page}
              rowsPerPage={props.pageLimit.limit}
              rowsPerPageOptions={[25, 50, 75, 100]}
            />
          )}
        </Box>
      </Card>
    </Card>
  );
};

export default withPaginatedApi(withTheme(ParkedNumberComponent), API_ENDPOINT);
