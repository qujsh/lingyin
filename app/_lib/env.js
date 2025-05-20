export function isElectron() {
    if (typeof window === 'undefined') return false;
    return navigator.userAgent.toLowerCase().includes('electron');
}
