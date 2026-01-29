import React, { useEffect, useState, useMemo } from "react";
import { getMyLogs } from "../../../../../../src/api/AuditLogs.js";
import ExportExcel from "../../../../../components/ExportExcel.jsx";

const ActivityHistory = () => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'rawDate', direction: 'desc' });

  // Filter states
  const [filterUser, setFilterUser] = useState("");
  const [filterLogId, setFilterLogId] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    yourActivity: 0
  });

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        const response = await getMyLogs();
        const logs = response.logs || [];

        const mapped = logs.map((log) => ({
          id: log.log_id,
          logId: log.log_id,
          user: `User #${log.actor_id}`,
          action: log.action,
          table: log.table_affected ?? "-",
          recordId: log.record_id ?? "-",
          rawDate: log.timestamp,
          timestamp: new Date(log.timestamp).toLocaleString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          // Determine icon based on action
          icon: getActionIcon(log.action),
          // Determine status based on action
          status: getActionStatus(log.action)
        }));

        setActivityData(mapped);
        
        // Calculate stats
        const today = new Date().toISOString().split('T')[0];
        const todayCount = mapped.filter(entry => 
          new Date(entry.rawDate).toISOString().split('T')[0] === today
        ).length;
        
        const yourActivityCount = mapped.filter(entry => 
          entry.user.toLowerCase().includes('user #') // Adjust based on your user ID logic
        ).length;

        setStats({
          total: mapped.length,
          today: todayCount,
          yourActivity: yourActivityCount
        });

      } catch (err) {
        console.error("❌ Failed to load activity logs:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  // Helper function to get icon based on action
  const getActionIcon = (action) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('create') || actionLower.includes('insert')) return 'plus-circle';
    if (actionLower.includes('update') || actionLower.includes('edit')) return 'edit';
    if (actionLower.includes('delete') || actionLower.includes('remove')) return 'trash';
    if (actionLower.includes('login') || actionLower.includes('logout')) return 'sign-in-alt';
    if (actionLower.includes('password')) return 'key';
    if (actionLower.includes('read') || actionLower.includes('view')) return 'eye';
    return 'history';
  };

  // Helper function to get status based on action
  const getActionStatus = (action) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('fail') || actionLower.includes('error')) return 'warning';
    if (actionLower.includes('delete')) return 'danger';
    return 'success';
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return '#34a853';
      case 'warning': return '#fbbc05';
      case 'danger': return '#ea4335';
      default: return '#5f6368';
    }
  };

  // ==========================
  //      FILTER LOGIC
  // ==========================
  const filteredData = useMemo(() => {
    let result = activityData.filter((entry) => {
      const matchUser =
        filterUser === "" ||
        entry.user.toLowerCase().includes(filterUser.toLowerCase());

      const matchLogId =
        filterLogId === "" || entry.logId.toString().includes(filterLogId);

      const matchDate =
        filterDate === "" ||
        new Date(entry.rawDate).toISOString().split("T")[0] === filterDate;

      return matchUser && matchLogId && matchDate;
    });

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [activityData, filterUser, filterLogId, filterDate, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(activity => activity.id));
    }
  };

  // Reset filters
  const handleReset = () => {
    setFilterUser("");
    setFilterLogId("");
    setFilterDate("");
    setSelectedRows([]);
  };

  if (loading) return (
    <div className="activity-history-container">
      <div className="loading-spinner">
        <style jsx>{`
          .activity-history-container {
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .loading-spinner {
            text-align: center;
            padding: 40px;
          }
          
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #e8f0fe;
            border-top: 4px solid #1a73e8;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div className="spinner"></div>
        <p style={{ color: '#5f6368', fontSize: '16px' }}>Loading activity history...</p>
      </div>
    </div>
  );

  return (
    <div className="activity-history-container">
      <style jsx>{`
        .activity-history-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* Header Section */
        .activity-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 30px;
          color: white;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .activity-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.1;
        }
        
        .header-content {
          position: relative;
          z-index: 1;
        }
        
        .header-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .header-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 25px;
        }
        
        .stats-container {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 15px 20px;
          min-width: 150px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }
        
        /* Filters Section */
        .filters-section {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .filters-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #202124;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .filter-label {
          font-size: 14px;
          font-weight: 500;
          color: #5f6368;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .filter-input {
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          background-color: #f8f9fa;
        }
        
        .filter-input:focus {
          outline: none;
          border-color: #667eea;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 2px solid #f1f3f4;
        }
        
        .export-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .export-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #34a853 0%, #2e8b47 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(52, 168, 83, 0.25);
        }
        
        .reset-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: #f1f3f4;
          color: #5f6368;
          border: none;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .reset-btn:hover {
          background-color: #e8eaed;
          color: #202124;
        }
        
        .selected-count {
          font-size: 14px;
          color: #5f6368;
          font-weight: 500;
        }
        
        /* Table Section */
        .table-section {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .table-container {
          overflow-x: auto;
        }
        
        .activity-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          min-width: 1000px;
        }
        
        .table-header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%);
        }
        
        .table-header th {
          padding: 20px;
          text-align: left;
          font-weight: 600;
          color: #202124;
          font-size: 14px;
          border-bottom: 2px solid #e0e0e0;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .table-header th:hover {
          background-color: #f1f3f4;
        }
        
        .sort-indicator {
          margin-left: 5px;
          font-size: 12px;
          opacity: 0.6;
        }
        
        .checkbox-header {
          width: 50px;
          padding: 20px 10px;
        }
        
        .table-body tr {
          transition: all 0.2s ease;
          border-bottom: 1px solid #f1f3f4;
        }
        
        .table-body tr:hover {
          background-color: #f8f9fa;
        }
        
        .table-body td {
          padding: 18px 20px;
          color: #5f6368;
          font-size: 14px;
          vertical-align: middle;
        }
        
        .checkbox-cell {
          width: 50px;
          padding: 18px 10px;
        }
        
        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #667eea;
        }
        
        .user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }
        
        .action-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .action-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          background-color: #e8f0fe;
          color: #1a73e8;
        }
        
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }
        
        .timestamp-cell {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          white-space: nowrap;
        }
        
        /* No data state */
        .no-data {
          text-align: center;
          padding: 60px 20px;
          color: #5f6368;
        }
        
        .no-data-icon {
          font-size: 48px;
          color: #e0e0e0;
          margin-bottom: 20px;
        }
        
        /* Pagination */
        .pagination-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: #f8f9fa;
          border-top: 2px solid #e0e0e0;
        }
        
        .pagination-info {
          font-size: 14px;
          color: #5f6368;
        }
        
        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .pagination-btn {
          padding: 8px 16px;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background-color: #f1f3f4;
          border-color: #c0c0c0;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .activity-header {
            padding: 20px;
          }
          
          .header-title {
            font-size: 22px;
          }
          
          .stats-container {
            flex-direction: column;
            gap: 15px;
          }
          
          .stat-card {
            min-width: auto;
            width: 100%;
          }
          
          .filters-section {
            padding: 20px;
          }
          
          .filters-grid {
            grid-template-columns: 1fr;
          }
          
          .actions-row {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
          
          .export-wrapper {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      {/* Add Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Header Section */}
      <div className="activity-header">
        <div className="header-content">
          <h1 className="header-title">
            <i className="fas fa-history"></i>
            Activity History
          </h1>
          <p className="header-subtitle">
            Track and monitor all system activities and user actions
          </p>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Activities</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.today}</div>
              <div className="stat-label">Today's Activities</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.yourActivity}</div>
              <div className="stat-label">Your Activities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <h2 className="filters-title">
          <i className="fas fa-filter"></i>
          Filter Activities
        </h2>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">
              <i className="fas fa-user"></i>
              Filter by User
            </label>
            <input
              type="text"
              className="filter-input"
              placeholder="Search by user..."
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label className="filter-label">
              <i className="fas fa-fingerprint"></i>
              Filter by Log ID
            </label>
            <input
              type="number"
              className="filter-input"
              placeholder="Enter log ID..."
              value={filterLogId}
              onChange={(e) => setFilterLogId(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label className="filter-label">
              <i className="fas fa-calendar"></i>
              Filter by Date
            </label>
            <input
              type="date"
              className="filter-input"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="actions-row">
          <div className="selected-count">
            {selectedRows.length > 0 ? `${selectedRows.length} selected` : 'No items selected'}
          </div>
          
          <div className="export-wrapper">
            <button className="reset-btn" onClick={handleReset}>
              <i className="fas fa-redo"></i>
              Reset Filters
            </button>
            
            <ExportExcel 
              data={selectedRows.length > 0 
                ? filteredData.filter(item => selectedRows.includes(item.id))
                : filteredData
              } 
              filename="activity_logs.xlsx"
              buttonComponent={
                <button className="export-btn">
                  <i className="fas fa-file-export"></i>
                  Export {selectedRows.length > 0 ? `(${selectedRows.length})` : 'All'}
                </button>
              }
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <div className="table-container">
          {filteredData.length === 0 ? (
            <div className="no-data">
              <div className="no-data-icon">
                <i className="fas fa-inbox"></i>
              </div>
              <h3>No activity data found</h3>
              <p>Try adjusting your filters or check back later for new activities.</p>
            </div>
          ) : (
            <table className="activity-table">
              <thead className="table-header">
                <tr>
                  <th className="checkbox-header">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                      disabled={filteredData.length === 0}
                    />
                  </th>
                  <th onClick={() => handleSort('logId')}>
                    LOG ID {sortConfig.key === 'logId' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('user')}>
                    USER {sortConfig.key === 'user' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('action')}>
                    ACTION {sortConfig.key === 'action' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('table')}>
                    TABLE AFFECTED {sortConfig.key === 'table' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('recordId')}>
                    RECORD ID {sortConfig.key === 'recordId' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('rawDate')}>
                    TIMESTAMP {sortConfig.key === 'rawDate' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                </tr>
              </thead>
              
              <tbody className="table-body">
                {filteredData.map((activity) => (
                  <tr key={activity.id}>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={selectedRows.includes(activity.id)}
                        onChange={() => handleRowSelect(activity.id)}
                      />
                    </td>
                    <td style={{ fontWeight: '600', color: '#202124' }}>
                      {activity.logId}
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {activity.user.charAt(0)}
                        </div>
                        <span style={{ fontWeight: '500', color: '#202124' }}>
                          {activity.user}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <div className="action-icon">
                          <i className={`fas fa-${activity.icon}`}></i>
                        </div>
                        <span style={{ color: '#202124' }}>{activity.action}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        backgroundColor: '#e8f0fe', 
                        padding: '4px 12px', 
                        borderRadius: '12px',
                        fontSize: '13px',
                        color: '#1a73e8',
                        fontWeight: '500'
                      }}>
                        {activity.table}
                      </span>
                    </td>
                    <td style={{ fontFamily: "'Monaco', 'Menlo', monospace", fontSize: '13px' }}>
                      {activity.recordId}
                    </td>
                    <td className="timestamp-cell">
                      {activity.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination - You can implement this based on your API */}
        {filteredData.length > 0 && (
          <div className="pagination-section">
            <div className="pagination-info">
              Showing {filteredData.length} of {activityData.length} activities
            </div>
            <div className="pagination-controls">
              <button className="pagination-btn" disabled>
                <i className="fas fa-chevron-left"></i> Previous
              </button>
              <span style={{ padding: '0 10px', color: '#5f6368' }}>Page 1 of 1</span>
              <button className="pagination-btn" disabled>
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;