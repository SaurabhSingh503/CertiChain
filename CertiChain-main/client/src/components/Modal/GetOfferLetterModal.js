import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const GetOfferLetterModal = ({
  open,
  handleClose,
  formData,
  handleChange,
  getOfferLetter,
}) => {
  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle textAlign={'center'} variant="h5" sx={{fontWeight: '600'}}>Get Offer Letter</DialogTitle>
      <DialogContent sx={{
        paddingX: '1.5rem',
        marginY: '1rem',
      }}>
        <Grid container spacing={2} sx={{
          paddingTop: '2rem'
        }}>
          <Grid item xs={12}>
            <TextField
              label="Offer Letter ID"
              name="offerLetterId"
              value={formData.offerLetterId || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingX: '1.5rem', width: 'auto', paddingBottom: '30px'}}>
        <Button onClick={() => handleClose(false)} color="secondary" variant="outlined" fullWidth sx={{ paddingY: '18px' }}>
          Cancel
        </Button>
        <Button
          onClick={getOfferLetter}
          color="primary"
          variant="contained"
          fullWidth
          sx={{ display: 'flex', textAlign: 'center' }}
        >
          Get Offer Letter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GetOfferLetterModal;
