"use client";

import { useState } from "react";
import { AlertTriangle, TrendingUp, CheckCircle2, ChevronRight, Share, Mail } from "lucide-react";
import styles from "./SmartDemand.module.css";

type Product = {
  id: number;
  name: string;
  sku: string;
  stock: number;
  status: "Critical" | "Low Stock" | "Optimal" | "Overstocked";
  demandForecast: string;
  aiAction: string;
  recommendedPoQty: number;
};

const mockProducts: Product[] = [
  { id: 1, name: "Wireless Noise-Canceling Headphones", sku: "HP-WNC-001", stock: 12, status: "Low Stock", demandForecast: "High (+45%)", aiAction: "Upgrade Stock", recommendedPoQty: 150 },
  { id: 2, name: "4K Gaming Monitor 27\"", sku: "M-4K-27G", stock: 5, status: "Critical", demandForecast: "Very High (+80%)", aiAction: "Emergency PO", recommendedPoQty: 50 },
  { id: 3, name: "Ergonomic Office Chair", sku: "F-CH-092", stock: 45, status: "Optimal", demandForecast: "Stable", aiAction: "Maintain", recommendedPoQty: 0 },
  { id: 4, name: "Mechanical Keyboard Pro", sku: "KB-M-PRO", stock: 120, status: "Overstocked", demandForecast: "Low (-20%)", aiAction: "Discount Campaign", recommendedPoQty: 0 },
];

const mockSuppliers = [
  { id: 101, name: "TechParts Global", rating: 4.8, delivery: "2-3 Days", price: "$45.00/unit" },
  { id: 102, name: "ElectroSupply Inc", rating: 4.2, delivery: "5-7 Days", price: "$42.50/unit" },
];

export function SmartDemandDashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [poGenerated, setPoGenerated] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setPoGenerated(false);
    setEmailSent(false);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case "Critical": return styles.statusCritical;
      case "Low Stock": return styles.statusLow;
      case "Optimal": return styles.statusOptimal;
      case "Overstocked": return styles.statusOver;
      default: return "";
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Smart Demand & Stock</h1>
          <p className={styles.subtitle}>AI-driven stock forecasting and replenishment</p>
        </div>
      </header>

      <div className={styles.grid}>
        {/* Main Table Area */}
        <div className={`${styles.tableCard} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Current Inventory Forecast</h2>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>SKU</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                  <th>Demand Forecast</th>
                  <th>AI Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((p) => (
                  <tr key={p.id} className={styles.tr} onClick={() => handleRowClick(p)}>
                    <td className={styles.tdName}>
                      <span className={styles.productName}>{p.name}</span>
                    </td>
                    <td>{p.sku}</td>
                    <td className={styles.tdStock}>{p.stock}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.forecastCell}>
                        <TrendingUp size={16} className={p.demandForecast.includes('+') ? styles.trendUp : styles.trendDown} />
                        {p.demandForecast}
                      </div>
                    </td>
                    <td>
                      <span className={styles.aiSuggestionBadge}>{p.aiAction}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel for AI Suggestions / PO Generation */}
        {selectedProduct && selectedProduct.recommendedPoQty > 0 ? (
          <div className={`${styles.sidePanel} glass-panel`}>
             <h3 className={styles.panelTitle}>AI Action Panel</h3>
             <div className={styles.productInfoSummary}>
               <h4>{selectedProduct.name}</h4>
               <p>SKU: {selectedProduct.sku}</p>
             </div>

             {!poGenerated ? (
               <div className={styles.aiRecommendationCard}>
                  <div className={styles.aiHeader}>
                    <AlertTriangle size={20} className={styles.aiIcon} />
                    <span>AI Recommendation</span>
                  </div>
                  <p className={styles.recomText}>Demand is surging. To prevent stockouts, it is recommended to upgrade stock by <strong>{selectedProduct.recommendedPoQty} units</strong> immediately.</p>
                  <button 
                    className={styles.primaryBtn}
                    onClick={() => setPoGenerated(true)}
                  >
                    Generate Purchase Order
                  </button>
               </div>
             ) : !emailSent ? (
               <div className={styles.poPhase}>
                 <div className={styles.successHeader}>
                    <CheckCircle2 size={24} className={styles.successIcon} />
                    <span>PO Generated</span>
                 </div>
                 <h4 className={styles.sectionHeading}>Suggested Suppliers</h4>
                 <div className={styles.supplierList}>
                   {mockSuppliers.map((sup) => (
                     <div key={sup.id} className={styles.supplierCard}>
                       <div className={styles.supTop}>
                         <span className={styles.supName}>{sup.name}</span>
                         <span className={styles.supRating}>★ {sup.rating}</span>
                       </div>
                       <div className={styles.supStats}>
                         <span>Est. {sup.delivery}</span>
                         <span>{sup.price}</span>
                       </div>
                       <button 
                         className={styles.secondaryBtn}
                         onClick={() => setEmailSent(true)}
                       >
                         <Mail size={16} /> Send PO
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
             ) : (
               <div className={styles.successState}>
                  <CheckCircle2 size={48} className={styles.successIconLg} />
                  <h3>PO Sent Successfully!</h3>
                  <p>The supplier has been notified and the dashboard will update once the delivery arrives.</p>
                  <button className={styles.outlineBtn} onClick={() => setSelectedProduct(null)}>Close</button>
               </div>
             )}
          </div>
        ) : selectedProduct ? (
          <div className={`${styles.sidePanel} glass-panel`}>
            <h3 className={styles.panelTitle}>AI Action Panel</h3>
            <div className={styles.productInfoSummary}>
               <h4>{selectedProduct.name}</h4>
               <p>SKU: {selectedProduct.sku}</p>
            </div>
            <div className={styles.aiRecommendationCardSafe}>
               <CheckCircle2 size={20} className={styles.successIcon} />
               <p>Stock levels are optimal or overstocked. No reorder required at this time.</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
