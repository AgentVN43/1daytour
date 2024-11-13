import React, { createContext, useContext, useState } from 'react';

// Mock data
const mockServices = [
  {
    id: '1',
    name: 'Hotel Room',
    description: 'Standard hotel room accommodation',
    category: 'ACCOMMODATION',
    serviceType: 'VARIABLE',
    isPackageEligible: true,
    isActive: true,
  },
  {
    id: '2',
    name: 'City Tour',
    description: 'Full day city tour',
    category: 'TRANSPORT',
    serviceType: 'VARIABLE',
    isPackageEligible: true,
    isActive: true,
  },
  {
    id: '3',
    name: 'Portable Speaker',
    description: 'Portable speaker rental',
    category: 'OTHER',
    serviceType: 'FIXED',
    defaultPrice: 50,
    isPackageEligible: true,
    isActive: true,
  }
];

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [services, setServices] = useState(mockServices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addService = (service) => {
    const newService = {
      ...service,
      id: Date.now().toString(),
    };
    setServices([...services, newService]);
  };

  const updateService = (id, updatedService) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, ...updatedService } : service
    ));
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const value = {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
}