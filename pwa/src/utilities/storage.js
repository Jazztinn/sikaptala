/**
 * Storage Utilities
 * Abstraction for localStorage and IndexedDB
 */

/**
 * LocalStorage wrapper
 */
export const localStorage_ = {
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('LocalStorage set error:', e);
      return false;
    }
  },

  get(key) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('LocalStorage get error:', e);
      return null;
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('LocalStorage remove error:', e);
      return false;
    }
  },

  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (e) {
      console.error('LocalStorage clear error:', e);
      return false;
    }
  },

  keys() {
    try {
      return Object.keys(window.localStorage);
    } catch (e) {
      console.error('LocalStorage keys error:', e);
      return [];
    }
  }
};

/**
 * IndexedDB wrapper
 */
export class IndexedDBStore {
  constructor(dbName = 'sikaptala-db', version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  async init(storeName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async set(storeName, key, value) {
    if (!this.db) await this.init(storeName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put({ id: key, data: value });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async get(storeName, key) {
    if (!this.db) await this.init(storeName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result?.data || null);
    });
  }

  async remove(storeName, key) {
    if (!this.db) await this.init(storeName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName) {
    if (!this.db) await this.init(storeName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAll(storeName) {
    if (!this.db) await this.init(storeName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const items = request.result.map(item => ({ [item.id]: item.data }));
        resolve(Object.assign({}, ...items));
      };
    });
  }
}

/**
 * Session storage wrapper
 */
export const sessionStorage_ = {
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('SessionStorage set error:', e);
      return false;
    }
  },

  get(key) {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('SessionStorage get error:', e);
      return null;
    }
  },

  remove(key) {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('SessionStorage remove error:', e);
      return false;
    }
  },

  clear() {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (e) {
      console.error('SessionStorage clear error:', e);
      return false;
    }
  }
};
