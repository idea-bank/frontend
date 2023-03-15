import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function SignUp() {
    return (
        <Paper sx={{ height: 1, maxWidth: 625, minHeight: "100vh", padding: 2, display: "block" }} id="form-container">
            <Typography variant="h4" sx={{padding: 1}}>
                Sign Up to Idea Bank
            </Typography>
        <form style={{display: "flex", flexDirection: "column"}}>
        <TextField
          name="displayname"
          label="Display Name"
          variant="outlined"
          helperText="What other users will see"
          sx={{ marginBottom: 1 }}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          helperText="What you use to log in"
          sx={{ marginBottom: 1 }}
        ></TextField>
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText="Minimum 8 characters"
          sx={{ marginBottom: 1 }}
        ></TextField>
        <Button variant="contained">
            Sign Up
        </Button>
        
        </form>
      </Paper>
    )
}