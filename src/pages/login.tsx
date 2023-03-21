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
import Link from "next/link";

type AlertInfo = {
  alert: AlertColor;
  message: String;
};
export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<AlertInfo>();
  const { register, handleSubmit } = useForm<SignupData>();

  const onSubmit: SubmitHandler<SignupData> = async (data: SignupData) => {
    // TODO: Implement login with backend API
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
          minHeight: "100vh",
          padding: 2,
          display: "block",
        }}
        id="form-container"
      >
        <Typography variant="h4" sx={{ padding: 1 }}>
          Log in to Idea Bank
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Email"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            {...register("email")}
          ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            sx={{ marginBottom: 2 }}
            {...register("password")}
          ></TextField>
          {isLoading ? (
            <LoadingButton
              loading
              variant="contained"
            >
              <span>Log in</span>
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              type="submit"
            >
              Log in
            </Button>
          )}
         <Typography sx={{textAlign: "center", marginTop: 2}}>New to Idea Bank? <Link href="/signup">Create an Account</Link>.</Typography>

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
