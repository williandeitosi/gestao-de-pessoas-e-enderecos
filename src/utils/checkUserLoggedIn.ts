export async function checkUserLoggedIn(): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:3000/users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("error checking if user is loggedin", error);
    return false;
  }
}
