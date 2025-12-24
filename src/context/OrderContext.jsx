import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order) => {
        const newOrder = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            status: 'Pending',
            ...order
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const getOrderStats = () => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);
        const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
        return { totalOrders, totalRevenue, avgOrderValue };
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, getOrderStats }}>
            {children}
        </OrderContext.Provider>
    );
};
