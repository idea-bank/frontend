export interface SignupData {
  displayName: string;
  email: string;
  password: string;
}

export async function signup(formData: SignupData): Promise<boolean> {
  const base64Credentials = Buffer.from(
    `${formData.email}:${formData.password}`
  ).toString("base64");
  const requestBody = {
    displayName: formData.displayName,
    credentials: base64Credentials,
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/users/web2/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (response.ok) {
    return true;
  } else {
    throw new Error(
      `Failed to submit form data. Status code: ${response.status}`
    );
  }
}
