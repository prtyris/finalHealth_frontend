import React, { useState } from 'react';

const ActivityHistory = () => {
  const [activityData, setActivityData] = useState([
    { logId: 74, user: 'Carl Joseph Olmedo', action: 'Added new doctor...', table: 'doctors', recordId: 101, timestamp: '2025-10-26 09:02 AM' },
    { logId: 79, user: 'Carlson Sampan', action: 'Added new doctor...', table: 'clinics', recordId: 206, timestamp: '2025-10-26 09:10 AM' },
    { logId: 76, user: 'Kristine Olaivar', action: 'Added new doctor...', table: 'sessions', recordId: 310, timestamp: '2025-10-26 09:15 AM' }
  ]);
  
  const [editingAction, setEditingAction] = useState(null);
  const [newActionText, setNewActionText] = useState('');
  const [showAddAction, setShowAddAction] = useState(false);
  const [newActivity, setNewActivity] = useState({
    user: 'Kristine Olaivar',
    action: '',
    table: 'doctors',
    recordId: ''
  });

  const startEditingAction = (index, currentAction) => {
    setEditingAction(index);
    setNewActionText(currentAction);
  };

  const saveAction = (index) => {
    const updatedActivities = [...activityData];
    updatedActivities[index].action = newActionText;
    setActivityData(updatedActivities);
    setEditingAction(null);
    setNewActionText('');
  };

  const cancelEditing = () => {
    setEditingAction(null);
    setNewActionText('');
  };

  const handleNewActivityChange = (field, value) => {
    setNewActivity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addNewActivity = () => {
    if (newActivity.action.trim() && newActivity.recordId.trim()) {
      const newLog = {
        logId: Math.max(...activityData.map(a => a.logId)) + 1,
        user: newActivity.user,
        action: newActivity.action,
        table: newActivity.table,
        recordId: newActivity.recordId,
        timestamp: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(',', '')
      };
      
      setActivityData(prev => [newLog, ...prev]);
      setNewActivity({
        user: 'Kristine Olaivar',
        action: '',
        table: 'doctors',
        recordId: ''
      });
      setShowAddAction(false);
    }
  };

  const deleteActivity = (index) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      const updatedActivities = activityData.filter((_, i) => i !== index);
      setActivityData(updatedActivities);
    }
  };

  const handleExportPDF = () => {
    alert('Exporting activity history as PDF...');
  };

  return (
    <div className="space-y-6">
      {/* Activity Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            <option>Filter by User</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            <option>Filter by Log Id</option>
          </select>
          <input 
            type="date" 
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            placeholder="mm/dd/yyyy"
          />
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowAddAction(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm flex-1 sm:flex-none"
          >
            + Add New Activity
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
          >
            📥 Export PDF
          </button>
        </div>
      </div>

      {/* Add New Activity Form */}
      {showAddAction && (
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Activity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Action
              </label>
              <input
                type="text"
                value={newActivity.action}
                onChange={(e) => handleNewActivityChange('action', e.target.value)}
                placeholder="Enter action (e.g., Added new doctor...)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Table Affected
              </label>
              <select
                value={newActivity.table}
                onChange={(e) => handleNewActivityChange('table', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
              >
                <option value="doctors">Doctors</option>
                <option value="clinics">Clinics</option>
                <option value="sessions">Sessions</option>
                <option value="patients">Patients</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Record ID
              </label>
              <input
                type="text"
                value={newActivity.recordId}
                onChange={(e) => handleNewActivityChange('recordId', e.target.value)}
                placeholder="Enter record ID"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={addNewActivity}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors font-medium"
            >
              Add Activity
            </button>
            <button
              onClick={() => setShowAddAction(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Activity Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Log ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Table Affected
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Record ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {activityData.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.logId}
                </td>
                <td className="px-4 py-4 text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    {activity.user}
                  </a>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {editingAction === index ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newActionText}
                        onChange={(e) => setNewActionText(e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-600 dark:text-white"
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => saveAction(index)}
                          className="bg-green-600 hover:bg-green-700 text-white p-1 rounded text-xs"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-red-600 hover:bg-red-700 text-white p-1 rounded text-xs"
                        >
                          ✗
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{activity.action}</span>
                      <button
                        onClick={() => startEditingAction(index, activity.action)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.table}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.recordId}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.timestamp}
                </td>
                <td className="px-4 py-4 text-sm">
                  <button
                    onClick={() => deleteActivity(index)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded text-xs"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityHistory;