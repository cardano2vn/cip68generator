export const isMobile = (userAgent: string): boolean => {
    return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
};
