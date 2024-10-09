/* eslint-disable @typescript-eslint/no-unused-vars */
interface Data {
    createdAt: Date;
    updatedAt: Date;
    [key: string]: unknown;
}

export function sanitizeDate(data: Data | null) {
    if (!data) {
        return null;
    }
    const { createdAt, updatedAt, ...sanitized } = data;
    return { ...sanitized };
}
