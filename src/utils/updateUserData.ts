import { User } from "./fetchUserData";

export async function updateUserData(
  userId: string,
  updatedData: Partial<User>
) {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return response.json();
}
