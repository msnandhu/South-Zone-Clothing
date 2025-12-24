import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL || '';

    useEffect(() => {
        fetch(`${API_URL}/api/orders`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error('Error fetching orders:', err));
    }, []);

    const addOrder = async (order) => {
        try {
            const res = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            const newOrder = await res.json();
            setOrders(prev => [newOrder, ...prev]);
            return newOrder;
        } catch (err) {
            console.error('Error adding order:', err);
            return null;
        }
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
