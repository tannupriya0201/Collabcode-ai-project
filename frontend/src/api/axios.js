import axios from "axios";

/* =======================
   AXIOS INSTANCE
======================= */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* =======================
   REQUEST INTERCEPTOR
======================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ✅ ADD NO-CACHE FIX (ONLY THIS PART IS NEW)
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =======================
   RESPONSE INTERCEPTOR
======================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const currentPath = window.location.pathname;
    const isAuthRoute = originalRequest?.url?.includes("/auth");

    /* ===============================
       🔁 TOKEN EXPIRED (401)
       ❌ SKIP auth & email-not-verified
    =============================== */
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      !currentPath.includes("email-not-verified")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");

        const newToken = res.data.accessToken;
        localStorage.setItem("token", newToken);

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return api(originalRequest);
      } catch {
        localStorage.clear();
        return Promise.reject(error);
      }
    }

    /* ===============================
       🚫 FORBIDDEN (403)
       ❌ NEVER auto redirect here
    =============================== */
    if (
      error.response?.status === 403 &&
      !isAuthRoute &&
      !currentPath.includes("email-not-verified")
    ) {
      localStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default api;
