import { Search, Bell, User } from "lucide-react";
import styles from "./Topbar.module.css";

export function Topbar() {
  return (
    <header className={`${styles.topbar} glass-panel`}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={18} />
        <input 
          type="text" 
          placeholder="Search inventory, orders, or suppliers..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge}></span>
        </button>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <User size={18} />
          </div>
          <div className={styles.profileDetails}>
            <span className={styles.name}>Admin User</span>
            <span className={styles.role}>Store Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
}
