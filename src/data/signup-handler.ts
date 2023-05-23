export interface SignupData {
  displayName: string;
  password: string;
}
const API_URL = "https://accounts-service-fvmy8.ondigitalocean.app";

export async function signup(formData: SignupData): Promise<boolean> {
  const base64Credentials = Buffer.from(`${formData.password}`).toString(
    "base64"
  );
  const displayName = Buffer.from(`${formData.displayName}`).toString("base64");
  const requestBody = {
    display_name: displayName,
    password: base64Credentials,
  };
  const response = await fetch(`${API_URL}/accounts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error(
      `Failed to submit form data. Status code: ${response.status}`
    );
  }
}
