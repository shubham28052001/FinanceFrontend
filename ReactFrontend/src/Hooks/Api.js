 export const refreshAccessToken = async () => {
     try {
        const res = await fetch("http://localhost:5000/api/users/refresh-token", {
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