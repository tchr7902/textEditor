import { openDB } from 'idb';

const initDB = async () => {
  return openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
};

export const putDb = async (content) => {
  try {
    const db = await initDB();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.clear();
    await store.put({ content });
    await tx.complete;
    console.log('Content added to database');
  } catch (error) {
    console.error('Error adding content to database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await initDB();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const data = await store.getAll();
    await tx.complete;
    return data.length > 0 ? data[0].content : null;
  } catch (error) {
    console.error('Error getting content from database:', error);
    return null;
  }
};

// Initialize the database
initDB();
