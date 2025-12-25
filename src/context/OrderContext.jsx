import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await api.get('/orders');
            if (data) setOrders(data);
        };
        fetchOrders();
    }, []);

    const addOrder = async (order) => {
        try {
            const newOrder = await api.post('/orders', order);
            setOrders(prev => [newOrder, ...prev]);
            return newOrder;
        } catch (error) {
            console.error('Failed to add order:', error);
            throw error;
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
