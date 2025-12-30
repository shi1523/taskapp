

const API_BASE = 'http://localhost:5000/api'; 

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  async register(email, password, name) {
    await delay(800);

    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    const user = {
      id: Date.now(),
      email,
      name
    };

    const token = btoa(
      JSON.stringify({
        user,
        exp: Date.now() + 24 * 60 * 60 * 1000
      })
    );

    return { user, token };
  },

  async login(email, password) {
    await delay(800);

    if (!email || !password || password.length < 6) {
      throw new Error('Invalid credentials');
    }

    const user = {
      id: Date.now(),
      email,
      name: email.split('@')[0]
    };

    const token = btoa(
      JSON.stringify({
        user,
        exp: Date.now() + 24 * 60 * 60 * 1000
      })
    );

    return { user, token };
  },

  async getProfile(token) {
    await delay(500);

    const decoded = JSON.parse(atob(token));
    return decoded.user;
  },

  async getTasks() {
    await delay(500);

    const stored = sessionStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  },

  async createTask(token, task) {
    await delay(500);

    const tasks = await this.getTasks();
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    const updated = [...tasks, newTask];
    sessionStorage.setItem('tasks', JSON.stringify(updated));

    return newTask;
  },

  async updateTask(token, id, updates) {
    await delay(500);

    const tasks = await this.getTasks();
    const updatedTasks = tasks.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );

    sessionStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTasks.find(t => t.id === id);
  },

  async deleteTask(token, id) {
    await delay(500);

    const tasks = await this.getTasks();
    const updatedTasks = tasks.filter(t => t.id !== id);

    sessionStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { success: true };
  }
};

export default api;
