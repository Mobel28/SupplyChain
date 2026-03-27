"use client";

import { Users, Truck, Star, Phone, Activity } from "lucide-react";
import styles from "./SupplierDashboard.module.css";

const mockSuppliers = [
  { id: 101, name: "TechParts Global", rating: 4.8, reliability: "98%", delivery: "2-3 Days", activeOrders: 12, quality: "Excellent" },
  { id: 102, name: "ElectroSupply Inc", rating: 4.2, reliability: "85%", delivery: "5-7 Days", activeOrders: 3, quality: "Good" },
  { id: 103, name: "Nexus Components", rating: 3.5, reliability: "72%", delivery: "10-14 Days", activeOrders: 0, quality: "Average" },
  { id: 104, name: "Quantum Displays", rating: 4.9, reliability: "99%", delivery: "1-2 Days", activeOrders: 24, quality: "Excellent" },
];

export function SupplierDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Supplier Performance</h1>
          <p className={styles.subtitle}>Monitor and manage vendor relationships and delivery metrics</p>
        </div>
        <button className={styles.primaryBtn}>
          <Users size={18} /> Add New Supplier
        </button>
      </header>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIcon}><Truck size={24} /></div>
          <div>
             <p className={styles.statLabel}>Active POs</p>
             <h3 className={styles.statValue}>39</h3>
          </div>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIcon}><Star size={24} /></div>
          <div>
             <p className={styles.statLabel}>Avg Reliability</p>
             <h3 className={styles.statValue}>88.5%</h3>
          </div>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIcon}><Activity size={24} /></div>
          <div>
             <p className={styles.statLabel}>Lead Time Variance</p>
             <h3 className={styles.statValue}>+1.2 Days</h3>
          </div>
        </div>
      </div>

      <div className={`${styles.tableCard} glass-panel`}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Vendor Network List</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Performance Rating</th>
                <th>Reliability Score</th>
                <th>Avg Lead Time</th>
                <th>Quality Index</th>
                <th>Active Orders</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSuppliers.map((s) => (
                <tr key={s.id} className={styles.tr}>
                  <td className={styles.supplierName}>{s.name}</td>
                  <td>
                    <div className={styles.ratingCell}>
                      <Star size={16} fill="currentColor" className={styles.ratingStar} />
                      {s.rating}
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.reliabilityBadge} ${parseInt(s.reliability) > 90 ? styles.highReal : parseInt(s.reliability) > 80 ? styles.medReal : styles.lowReal}`}>
                      {s.reliability}
                    </span>
                  </td>
                  <td>{s.delivery}</td>
                  <td>{s.quality}</td>
                  <td>{s.activeOrders}</td>
                  <td>
                    <button className={styles.actionBtn} title="Contact"><Phone size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
