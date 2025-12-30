
import React, { useState, useEffect, createContext, useContext } from 'react';
import { AlertCircle, CheckCircle, LogOut, Plus, Edit2, Trash2, Search, User, Lock, Mail } from 'lucide-react';


const API_BASE = 'http://localhost:5000/api';

const api = {
  async register(email, password, name) {

    await new Promise(resolve => setTimeout(resolve, 800));
    const user = { id: Date.now(), email, name };
    const token = btoa(JSON.stringify({ user, exp: Date.now() + 86400000 }));
    return { user, token };
  },
  
  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (password.length < 6) throw new Error('Invalid credentials');
    const user = { id: Date.now(), email, name: email.split('@')[0] };
    const token = btoa(JSON.stringify({ user, exp: Date.now() + 86400000 }));
    return { user, token };
  },
  
  async getProfile(token) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const decoded = JSON.parse(atob(token));
    return decoded.user;
  },
  
  async getTasks(token) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const stored = sessionStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  },
  
  async createTask(token, task) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const tasks = await this.getTasks(token);
    const newTask = { ...task, id: Date.now(), createdAt: new Date().toISOString() };
    const updated = [...tasks, newTask];
    sessionStorage.setItem('tasks', JSON.stringify(updated));
    return newTask;
  },
  
  async updateTask(token, id, updates) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const tasks = await this.getTasks(token);
    const updated = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    sessionStorage.setItem('tasks', JSON.stringify(updated));
    return updated.find(t => t.id === id);
  },
  
  async deleteTask(token, id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const tasks = await this.getTasks(token);
    const updated = tasks.filter(t => t.id !== id);
    sessionStorage.setItem('tasks', JSON.stringify(updated));
    return { success: true };
  }
};
