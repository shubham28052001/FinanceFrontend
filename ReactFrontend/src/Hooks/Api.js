 export const refreshAccessToken = async () => {
     try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/refresh-token`, {
            method: "POST",
            credentials: "include" 
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        // new access token store karo
        localStorage.setItem("accessToken", data.accessToken);

        return data.accessToken;

    } catch (error) {
        console.error("Refresh failed:", error);
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }
};