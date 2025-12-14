const API_BASE = import.meta.env.VITE_API_BASE;

export async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const body = await res.json();

    // HTTP-level error (4xx / 5xx)
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        message: body.message || "Request failed",
        code: body.code || "UNKNOWN_ERROR",
        details: body.details || null,
      };
    }

    // Application-level success
    return {
      ok: true,
      data: body.data,
      message: body.message,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      message: "Network error",
      code: "NETWORK_ERROR",
    };
  }
}
