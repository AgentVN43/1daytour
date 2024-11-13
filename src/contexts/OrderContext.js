import React, { createContext, useContext, useState } from 'react';

const mockOrders = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    orderDate: '2024-11-01',
    status: 'PENDING', // PENDING, CONFIRMED, COMPLETED, CANCELLED
    type: 'PACKAGE', // PACKAGE or SERVICE
    packageId: '1',
    totalAmount: 300,
    participants: 10,
    eventDate: '2024-12-01',
    notes: 'Corporate event',
    isActive: true
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    orderDate: '2024-11-01',
    status: 'CONFIRMED',
    type: 'SERVICE',
    serviceId: '2',
    quantity: 2,
    totalAmount: 400,
    eventDate: '2024-12-15',
    notes: 'Family tour',
    isActive: true
  }
];

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      orderDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      isActive: true
    };
    setOrders([...orders, newOrder]);
  };

  const updateOrder = (id, updatedOrder) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, ...updatedOrder } : order
    ));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const updateOrderStatus = (id, status) => {
    updateOrder(id, { status });
  };

  const value = {
    orders,
    loading,
    error,
    addOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}