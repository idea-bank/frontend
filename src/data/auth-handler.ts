interface AuthResponse {
  sucess: string;
}

export interface AuthData {
  email: string;
  password: string;
}

const AUTH_ENDPOINT = "api/v1/users/web2/auth";

const fetchAuthData = async (formData: AuthData): Promise<AuthResponse> => {
  const base64Credentials = Buffer.from(
    `${formData.email}:${formData.password}`
  ).toString("base64");
  const requestBody = {
    AuthKeyType: "Username+Password",
    Credentials: base64Credentials,
  };
  const response = await fetch(AUTH_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  if(response.ok) {
    const data: AuthResponse = await response.json();
    return data;
  }
  throw new Error(
    `Failed to submit form data. Status code: ${response.status}`
  );
};

export default fetchAuthData;
