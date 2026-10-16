import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import {
  initialAdminRecords,
  initialAdminSettings,
  type AdminRecord,
  type AdminSection,
} from "@/data/admin-demo-data";

type AdminContextValue = {
  records: Record<AdminSection, AdminRecord[]>;
  addRecord: (section: AdminSection, record: AdminRecord) => void;
  updateRecord: (section: AdminSection, id: string, record: AdminRecord) => void;
  settings: typeof initialAdminSettings;
  updateSettings: (settings: typeof initialAdminSettings) => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

function copyInitialRecords() {
  return Object.fromEntries(
    Object.entries(initialAdminRecords).map(([section, records]) => [
      section,
      records.map((record) => ({ ...record })),
    ]),
  ) as Record<AdminSection, AdminRecord[]>;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState(copyInitialRecords);
  const [settings, setSettings] = useState({ ...initialAdminSettings });

  const value = useMemo<AdminContextValue>(
    () => ({
      records,
      addRecord: (section, record) => {
        setRecords((current) => ({
          ...current,
          [section]: [{ ...record, id: record.id || `${section.slice(0, 3).toUpperCase()}-${Date.now()}` }, ...current[section]],
        }));
      },
      updateRecord: (section, id, record) => {
        setRecords((current) => ({
          ...current,
          [section]: current[section].map((item) => item.id === id ? { ...record, id } : item),
        }));
      },
      settings,
      updateSettings: setSettings,
    }),
    [records, settings],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider.");
  return context;
}