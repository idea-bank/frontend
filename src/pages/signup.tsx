import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { signup, SignupData } from "@/data/signup-handler";
import { useIsSmall } from "@/hooks/media-queries";


type AlertInfo = {
  alert: AlertColor;
  message: String;
};
export default function SignUp() {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<AlertInfo>();
  const { register, handleSubmit } = useForm<SignupData>();
  const isMobile = useIsSmall();
  const onSubmit: SubmitHandler<SignupData> = async (data: SignupData) => {
    try {
      setLoading(true);
      await signup(data);
      setStatus({
        alert: "success",
        message: "Success. Account has been created.",
      });
    } catch (err) {
      setStatus({
        alert: "error",
        message:
          "Error. Invalid credentials received. Account has not been created.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper
        sx={{
          height: 1,
          maxWidth: 625,
          width: 0.93,
          minHeight: isMobile ? "100vh" : "",
          marginTop: isMobile ? "0" : "3%",

          padding: 2,
          display: "block",
        }}
        id="form-container"
      >
        <Typography variant="h4" sx={{ padding: 1 }}>
          Sign Up to Idea Bank
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Display Name"
            variant="outlined"
            helperText="What other users will see"
            sx={{ marginBottom: 1 }}
            {...register("displayName")}
          />
          <TextField
            label="Email"
            variant="outlined"
            helperText="What you use to log in"
            sx={{ marginBottom: 1 }}
            {...register("email")}
          ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            helperText="Minimum 8 characters"
            sx={{ marginBottom: 1 }}
            {...register("password")}
          ></TextField>
          {isLoading ? (
            <LoadingButton
              loading
              variant="contained"
            >
              <span>Sign Up</span>
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              type="submit"
            >
              Sign Up
            </Button>
          )}

          {status ? (
            <Alert severity={status.alert} sx={{ marginTop: 1 }}>
              {status.message}
            </Alert>
          ) : (
            <></>
          )}
        </form>
      </Paper>
    </div>
  );
}
