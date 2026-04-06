import { apiRequest } from "../../../api/httpClient/httpClient";

export const getDashboardOverviewApi = () =>
  apiRequest("/api/dashboard-routes/overview");
export const getDashboardUsageApi = () =>
  apiRequest("/api/dashboard-routes/usage");
