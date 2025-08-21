export const ssrMode = typeof window === 'undefined';
export const appMode = process.env.NEXT_PUBLIC_APP_MODE;
export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const appName = 'duoc-lieu-xanh';
export const DEFAULT_LOCALE = 'vi';

export const storageKeys = {
    TOKEN: `${appName}-token`,
    PROFILE: `${appName}-profile`,
};

export const ROLES_CODE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
    PARENT: 'PARENT',
};

export const metaDefaults = {
    title: 'Dược liệu xanh',
    description: 'Dược Liệu Xanh An Lành Cho Sức Khỏe',
    image: '/images/logo.png',
};
