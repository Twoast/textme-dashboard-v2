import { useTheme } from '@emotion/react';
import { DialogContent, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationDialog = ({ open, handleDialogResponse, data }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  console.log(open);
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleDialogResponse} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{data.title}</DialogTitle>
      {data.content && <DialogContent>{data.content}</DialogContent>}
      <DialogActions>
        <Button autoFocus onClick={() => handleDialogResponse({ action: 'dismiss', ...data })}>
          Cancel
        </Button>
        <Button onClick={() => handleDialogResponse({ action: data.acceptButtonText, ...data })} autoFocus>
          {data.acceptButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
