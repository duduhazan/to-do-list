import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "../context";
import { useContext } from "react";


const SnackBar = () => {
    const { snack } = useContext(SnackbarContext);
  return (
    <Snackbar
      autoHideDuration={3000}
      onClose={() => setSnack({ open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snack.open}
    >
      <Alert severity={snack.severity}>{snack.message}</Alert>
    </Snackbar>
  );
};

export default SnackBar;