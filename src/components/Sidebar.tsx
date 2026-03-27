"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Warehouse, 
  Truck, 
  RefreshCcw, 
  TrendingUp, 
  Menu
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { useState } from "react";

const navItems = [
  { href: "/smart-demand", label: "Smart Demand Stock", icon: TrendingUp },
  { href: "/suppliers", label: "Supplier Dashboard", icon: Truck },
  { href: "/warehouses", label: "Warehouse Optimization", icon: Warehouse },
  { href: "/products", label: "Product Sales", icon: BarChart3 },
  { href: "/returns", label: "Returns Automation", icon: RefreshCcw },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} glass-panel`}>
      <div className={styles.header}>
        {!collapsed && <div className={styles.logo}>NEXUS</div>}
        <button onClick={() => setCollapsed(!collapsed)} className={styles.toggleBtn}>
          <Menu size={20} className={styles.menuIcon} />
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          // default route to smart-demand
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/smart-demand");
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className={styles.icon} strokeWidth={isActive ? 2.5 : 2} />
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
