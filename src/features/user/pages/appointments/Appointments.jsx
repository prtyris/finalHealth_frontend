import React, { useState } from 'react';
import AddAppointmentModal from './modals/AddAppointmentModal';
import EditAppointmentModal from './modals/EditAppointmentModal';
import ViewAppointmentModal from './modals/ViewAppointmentModal';
import RescheduleModal from './modals/RescheduleModal';
import MedicalRecordModal from './modals/MedicalRecordModal';

const Appointments = ({ darkMode }) => {
  const [modals, setModals] = useState({
    addAppointment: false,
    editAppointment: false,
    viewAppointment: false,
    reschedule: false,
    medicalRecord: false
  });

  const [currentView, setCurrentView] = useState('weekly');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    doctor: 'all',
    status: 'all',
    clinic: 'all'
  });

  const [currentDateRange, setCurrentDateRange] = useState({
    start: new Date('2025-10-17'),
    end: new Date('2025-10-23')
  });

  const [appointments, setAppointments] = useState({
    today: [
      {
        id: 1,
        patientName: 'Carl Joseph Orence',
        gender: 'Male',
        clinic: 'CityHealth Clinic',
        date: '2025-10-17',
        time: '09:00 AM',
        reason: 'Root Canal Treatment',
        status: 'completed',
        doctor: 'Dr. Arias Reyes'
      },
      {
        id: 2,
        patientName: 'Carl Ivan Sampanpan',
        gender: 'Male',
        clinic: 'CityHealth Clinic',
        date: '2025-10-17',
        time: '10:00 AM',
        reason: 'Consultation',
        status: 'scheduled',
        doctor: 'Dr. Arias Reyes'
      },
      {
        id: 3,
        patientName: 'Maria Santos',
        gender: 'Female',
        clinic: 'MediCare Center',
        date: '2025-10-17',
        time: '02:00 PM',
        reason: 'Dental Checkup',
        status: 'confirmed',
        doctor: 'Dr. Adrian Reyes'
      }
    ],
    all: [
      {
        id: 1,
        patientName: 'Carl Joseph Orence',
        gender: 'Male',
        clinic: 'CityHealth Clinic',
        date: '2025-10-17',
        time: '09:00 AM',
        status: 'completed',
        doctor: 'Dr. Arias Reyes'
      },
      {
        id: 4,
        patientName: 'Kristine Hilao',
        gender: 'Female',
        clinic: 'MediCare Center',
        date: '2025-10-19',
        time: '11:00 AM',
        status: 'cancelled',
        doctor: 'Dr. Adrian Reyes'
      },
      {
        id: 5,
        patientName: 'John Michael Cruz',
        gender: 'Male',
        clinic: 'CityHealth Clinic',
        date: '2025-10-20',
        time: '03:00 PM',
        status: 'scheduled',
        doctor: 'Dr. Arias Reyes'
      }
    ]
  });

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openModal = (modalName, appointment = null) => {
    setSelectedAppointment(appointment);
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedAppointment(null);
  };

  const navigateDate = (days) => {
    setCurrentDateRange(prev => ({
      start: new Date(prev.start.getTime() + days * 24 * 60 * 60 * 1000),
      end: new Date(prev.end.getTime() + days * 24 * 60 * 60 * 1000)
    }));
  };

  const setView = (viewType) => {
    setCurrentView(viewType);
  };

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const confirmAppointment = (appointmentId) => {
    setAppointments(prev => ({
      ...prev,
      today: prev.today.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'confirmed' } : apt
      )
    }));
  };

  const completeAppointment = (appointmentId) => {
    setAppointments(prev => ({
      ...prev,
      today: prev.today.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'completed' } : apt
      )
    }));
  };

  const deleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => ({
        today: prev.today.filter(apt => apt.id !== appointmentId),
        all: prev.all.filter(apt => apt.id !== appointmentId)
      }));
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      scheduled: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const statusText = {
      scheduled: 'Scheduled',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const formatDateRange = () => {
    const options = { month: 'short', day: 'numeric' };
    const startStr = currentDateRange.start.toLocaleDateString('en-US', options);
    const endStr = currentDateRange.end.toLocaleDateString('en-US', options);
    const year = currentDateRange.start.getFullYear();
    return `${startStr} - ${endStr}, ${year}`;
  };

  const filteredAppointments = (appointmentsList) => {
    return appointmentsList.filter(apt => {
      const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDoctor = filters.doctor === 'all' || apt.doctor.includes(filters.doctor === 'dr-arias' ? 'Arias' : 'Adrian');
      const matchesStatus = filters.status === 'all' || apt.status === filters.status;
      const matchesClinic = filters.clinic === 'all' || apt.clinic.includes(filters.clinic === 'cityhealth' ? 'CityHealth' : 'MediCare');
      
      return matchesSearch && matchesDoctor && matchesStatus && matchesClinic;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <button 
              onClick={() => navigateDate(-7)}
              className="hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              ←
            </button>
            <span className="font-medium">{formatDateRange()}</span>
            <button 
              onClick={() => navigateDate(7)}
              className="hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              →
            </button>
          </div>
          
          <input 
            type="text" 
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full lg:w-64"
            placeholder="Search appointments..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            onClick={() => openModal('addAppointment')}
          >
            + Add Appointment
          </button>
          
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentView === 'weekly' 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
              onClick={() => setView('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentView === 'monthly' 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
              onClick={() => setView('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-4">
          <select 
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.doctor}
            onChange={(e) => updateFilter('doctor', e.target.value)}
          >
            <option value="all">All Doctors</option>
            <option value="dr-arias">Dr. Arias Reyes</option>
            <option value="dr-adrian">Dr. Adrian Reyes</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.clinic}
            onChange={(e) => updateFilter('clinic', e.target.value)}
          >
            <option value="all">All Clinics</option>
            <option value="cityhealth">CityHealth Clinic</option>
            <option value="medicare">MediCare Center</option>
          </select>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Appointments</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Patient Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Gender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Clinic</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredAppointments(appointments.today).map(appointment => (
                <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.patientName}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.gender}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.clinic}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.time}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.reason}</td>
                  <td className="px-4 py-4 text-sm">{getStatusBadge(appointment.status)}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex gap-2">
                      {appointment.status === 'completed' && (
                        <button 
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                          onClick={() => openModal('medicalRecord', appointment)}
                        >
                          Record
                        </button>
                      )}
                      {appointment.status === 'scheduled' && (
                        <>
                          <button 
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                            onClick={() => openModal('reschedule', appointment)}
                          >
                            Reschedule
                          </button>
                          <button 
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                            onClick={() => confirmAppointment(appointment.id)}
                          >
                            Confirm
                          </button>
                        </>
                      )}
                      {appointment.status === 'confirmed' && (
                        <>
                          <button 
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                            onClick={() => openModal('reschedule', appointment)}
                          >
                            Reschedule
                          </button>
                          <button 
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                            onClick={() => completeAppointment(appointment.id)}
                          >
                            Complete
                          </button>
                        </>
                      )}
                      <button 
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                        onClick={() => openModal('editAppointment', appointment)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Appointments</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Patient Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Gender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Clinic</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredAppointments(appointments.all).map(appointment => (
                <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.patientName}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.gender}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.clinic}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{appointment.time}</td>
                  <td className="px-4 py-4 text-sm">{getStatusBadge(appointment.status)}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex gap-2">
                      <button 
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                        onClick={() => openModal('viewAppointment', appointment)}
                      >
                        View
                      </button>
                      <button 
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddAppointmentModal
        isOpen={modals.addAppointment}
        onClose={() => closeModal('addAppointment')}
      />

      <EditAppointmentModal
        isOpen={modals.editAppointment}
        onClose={() => closeModal('editAppointment')}
        appointment={selectedAppointment}
      />

      <ViewAppointmentModal
        isOpen={modals.viewAppointment}
        onClose={() => closeModal('viewAppointment')}
        appointment={selectedAppointment}
      />

      <RescheduleModal
        isOpen={modals.reschedule}
        onClose={() => closeModal('reschedule')}
        appointment={selectedAppointment}
      />

      <MedicalRecordModal
        isOpen={modals.medicalRecord}
        onClose={() => closeModal('medicalRecord')}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default Appointments;