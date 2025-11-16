import React, { useState } from "react";
import Layout from "../../components/Layout";
import StatsGrid from "./StatsGrid";
import ChartSection from "./ChartSection";
import UpcomingAppointments from "./UpcomingAppointments";
import ClinicsTable from "./ClinicsTable";

export default function Dashboard() {
  return (
    <Layout>
      <div className="w-full mt-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Doctor Dashboard
        </h1>

        {/* Stats Grid */}
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Chart Section (2 columns) */}
          <div className="lg:col-span-2">
            <ChartSection />
          </div>

          {/* Upcoming Appointments */}
          <UpcomingAppointments />
        </div>

        {/* Clinics Table */}
        <div className="mt-8">
          <ClinicsTable />
        </div>
      </div>
    </Layout>
  );
}
