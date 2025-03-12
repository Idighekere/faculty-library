export const getDepartmentsFullName = (shortName) => {
    switch (shortName) {
        case 'CPE':
            return 'Computer Engineering';
        case 'AGE':
            return 'Agricultural Engineering';
        case 'EEE':
            return 'Electrical and Electronics Engineering';
        case 'MEE':
            return 'Mechanical Engineering';
        case 'PEE':
            return 'Petroleum Engineering';
        case 'FDE':
            return 'Food Engineering';
        case 'CVE':
            return 'Civil Engineering';
        case 'CHE':
            return 'Chemical Engineering';
        default:
            return shortName;
    }
}


const saveToLocalStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("Error saving to local storage", error);
    }
};

const getFromLocalStorage = (key) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error("Error getting from local storage", error);
        return null;
    }
};

const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from local storage", error);
    }
};

const extractDriveFileId = (url) => {
    const regex = /(?:(?:drive|docs)\.google\.com\/(?:a\/[^/]+\/)?(?:file\/d\/|open\?id=|uc\?id=|thumbnail\?id=|document\/d\/|spreadsheets\/d\/|presentation\/d\/))([a-zA-Z0-9_-]{10,})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, extractDriveFileId };
