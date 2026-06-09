import { refreshAccessToken } from "../Hooks/Api";

export async function fetchWithAuth(url, options = {}) {

  let accessToken = localStorage.getItem("accessToken");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include"
  });


  if (response.status === 401) {

    const newToken = await refreshAccessToken();

    if (!newToken) {
      throw new Error("Session expired");
    }

    localStorage.setItem("accessToken", newToken);
    accessToken = newToken;

    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`
      },
      credentials: "include"
    });

  }

  return response;
}