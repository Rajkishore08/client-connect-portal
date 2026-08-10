import { MANAGED_SERVICES, type ManagedService } from "@/data/mock-data";

const STORAGE_KEY_SERVICES = "ows_portal_managed_services";

export function getManagedServices(): ManagedService[] {
  if (typeof window === "undefined") return MANAGED_SERVICES;
  const stored = localStorage.getItem(STORAGE_KEY_SERVICES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(MANAGED_SERVICES));
    return MANAGED_SERVICES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return MANAGED_SERVICES;
  }
}

export function saveManagedServices(services: ManagedService[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
  }
}

export function addManagedService(newService: Omit<ManagedService, "id">): ManagedService {
  const services = getManagedServices();
  const created: ManagedService = {
    ...newService,
    id: `svc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  };
  const updated = [created, ...services];
  saveManagedServices(updated);
  return created;
}

export function updateManagedService(id: string, patch: Partial<ManagedService>): ManagedService[] {
  const services = getManagedServices();
  const updated = services.map((s) => (s.id === id ? { ...s, ...patch } : s));
  saveManagedServices(updated);
  return updated;
}

export function deleteManagedService(id: string): ManagedService[] {
  const services = getManagedServices();
  const updated = services.filter((s) => s.id !== id);
  saveManagedServices(updated);
  return updated;
}
