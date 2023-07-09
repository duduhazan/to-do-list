import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export default SearchBar = () => {
  return (
    <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "auto" }}>
      <TextField
        id="outlined-basic"
        label="Search for Task"
        variant="outlined"
        color="info"
        fullWidth
        margin="normal"
        disabled={!tempTasks}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}