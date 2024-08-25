// db.js
import { openDB } from 'idb';

const dbPromise = openDB('weekStore', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('weeks')) {
            db.createObjectStore('weeks', { keyPath: 'id', autoIncrement: true });
        }
    },
});

export const saveWeek = async (week) => {
    const db = await dbPromise;
    await db.add('weeks', week);
};

export const getSavedWeeks = async () => {
    const db = await dbPromise;
    return await db.getAll('weeks');
};

export const clearWeeks = async () => {
    const db = await dbPromise;
    await db.clear('weeks');
};
