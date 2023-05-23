import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";

type AlertInfo = {
  alert: AlertColor;
  message: String;
};
type AuthData = {
  username: string;
  password: string;
};

export default function Login() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<AlertInfo>();
  const [jwt, setJwt] = useState<string>();

  const { register, handleSubmit } = useForm<AuthData>();

  const handleLogin = async (username: string, password: string) => {
    const data = {
      display_name: Buffer.from(`${username}`).toString("base64"),
      password: Buffer.from(`${password}`).toString("base64"),
    };
    const response = await fetch(
      "https://accounts-service-fvmy8.ondigitalocean.app/accounts/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      // Login successful
      const token = await response.json();
      console.log("Login successful! Token:", token);
      // Perform any additional actions after successful login
    } else {
      // Login failed
      console.error("Login failed:", response.status);
      throw new Error("Login failed");
      // Handle login failure
    }
  };

  const onSubmit: SubmitHandler<AuthData> = async (data: AuthData) => {
    try {
      setLoading(true);
      await handleLogin(data.username, data.password);
      setStatus({
        alert: "success",
        message: "Success. Redirecting you to your feed.",
      });
    } catch (err) {
      console.log(err);
      setStatus({
        alert: "error",
        message: "Error. Invalid credentials received. Try again.",
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
            label="Username"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            {...register("username")}
          ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            sx={{ marginBottom: 2 }}
            {...register("password")}
          ></TextField>
          {isLoading ? (
            <LoadingButton loading variant="contained">
              <span>Log in</span>
            </LoadingButton>
          ) : (
            <Button variant="contained" type="submit">
              Log in
            </Button>
          )}
          <Typography sx={{ textAlign: "center", marginTop: 2 }}>
            New to Idea Bank? <Link href="/signup">Create an Account</Link>.
          </Typography>

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
