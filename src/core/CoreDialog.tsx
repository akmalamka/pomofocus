import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import CoreButton from './CoreButton'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmDialog({ open, title, description, onClose, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '24px',
          px: 3,
          py: 4,
        },
      }}
    >
      <DialogTitle>
        <Typography color="primary" variant="h3" className="text-center">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography color="primary" variant="body2" className="text-center">
            {description}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', gap: 3 }}>
        <CoreButton onClick={onConfirm} color="primary" size="small" title="Save" />
        <CoreButton onClick={onClose} color="white" size="small" autoFocus title="Close" />
      </DialogActions>
    </Dialog>
  )
}
