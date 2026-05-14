export async function login({ email, password }) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // 1. must parse the JSON first to get 'data'
    const data = await response.json();

    // 2. Check if the status code is NOT in the 200-299 range
    if (!response.ok) {
      // Use the error message from the server if available
      throw new Error(data.message || data.error || "Login failed");
    }

    // 3. Save token (Ensure your backend calls it 'accessToken')
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
    }

    return data;
    
  } catch (error) {
    // 4. Re-throw the error so the UI (login form) can show it to the user
    console.error("Login Error:", error.message);
    throw error;
  }
}

export async function register({ name, email, password }) {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
}
