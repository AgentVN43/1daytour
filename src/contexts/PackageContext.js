import React, { createContext, useContext, useState } from 'react';

// Mock data for packages
const mockPackages = [
  {
    id: '1',
    name: 'Team Building Package',
    description: 'Full day team building package',
    services: [
      {
        serviceId: '1',
        defaultQuantity: 1,
        defaultPrice: 100
      },
      {
        serviceId: '2',
        defaultQuantity: 1,
        defaultPrice: 200
      }
    ],
    totalPrice: 300,
    isActive: true
  }
];

const PackageContext = createContext();

export function PackageProvider({ children }) {
  const [packages, setPackages] = useState(mockPackages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPackage = (newPackage) => {
    const packageToAdd = {
      ...newPackage,
      id: Date.now().toString(),
    };
    setPackages([...packages, packageToAdd]);
  };

  const updatePackage = (id, updatedPackage) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, ...updatedPackage } : pkg
    ));
  };

  const deletePackage = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const value = {
    packages,
    loading,
    error,
    addPackage,
    updatePackage,
    deletePackage
  };

  return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
}