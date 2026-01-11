import React from "react";
import "./AdminPanel.css";

const AdminPanel: React.FC = () => {
  const dummyUser = {
    name: "Admin User",
    email: "admin@nutrion.com",
    role: "Super Admin",
  };

  const dummyStats = {
    totalUsers: 1234,
    totalTests: 856,
    totalPlansSold: 432,
    lastLogin: "2025-06-25 14:30",
  };

  const dummyRecentUsers = [
    { name: "Carlos L.", date: "2025-06-25" },
    { name: "Ana M.", date: "2025-06-24" },
    { name: "Luis R.", date: "2025-06-24" },
  ];

  const handleGenerateQR = () => {
    alert("QR generado (dummy)");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
        <div className="admin-user-info">
          <span>{dummyUser.name}</span>
          <span className="admin-role">{dummyUser.role}</span>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Usuarios</h3>
          <p>{dummyStats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Tests Completados</h3>
          <p>{dummyStats.totalTests}</p>
        </div>
        <div className="stat-card">
          <h3>Planes Vendidos</h3>
          <p>{dummyStats.totalPlansSold}</p>
        </div>
        <div className="stat-card">
          <h3>Último Acceso</h3>
          <p>{dummyStats.lastLogin}</p>
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-button" onClick={handleGenerateQR}>
          Generar QR
        </button>
      </div>

      <div className="admin-recent-users">
        <h3>Usuarios Recientes</h3>
        <ul>
          {dummyRecentUsers.map((user, index) => (
            <li key={index}>
              <span>{user.name}</span>
              <span>{user.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
