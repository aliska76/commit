// Helper convert px -> rem
export const pxToRem = (px: number): string => `${px / 16}rem`;

export const tokens = {
    colors: {
        primary: '#1a1a1a',
        surface: '#ffffff',
        surfaceMuted: '#f5f5f5',
        textPrimary: '#333333',
        textSecondary: '#666666',
        price: '#2e7d32',
        border: '#e0e0e0',
        errorBg: '#ffebee',
        errorText: '#c62828',
        errorBorder: '#ffcdd2',
    },
    spacing: {
        xs: pxToRem(4),    // 0.25rem
        sm: pxToRem(8),    // 0.5rem
        md: pxToRem(12),   // 0.75rem
        lg: pxToRem(16),   // 1rem
        xl: pxToRem(20),   // 1.25rem
        xxl: pxToRem(24),  // 1.5rem
    },
    typography: {
        fontSize: {
            sm: pxToRem(14),   // 0.875rem
            base: pxToRem(16), // 1rem
            lg: pxToRem(18),   // 1.125rem
            xl: pxToRem(20),   // 1.25rem
        },
        lineHeight: {
            tight: 1.2,
            normal: 1.4,
            relaxed: 1.6,
        },
        fontWeight: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        fontFamily: "system-ui, sans-serif"
    },
    radii: {
        sm: pxToRem(6),
        md: pxToRem(8),
        lg: pxToRem(12),
    },
    shadows: {
        cardList: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)',
        cardGrid: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.05)',
    },
    components: {
        cardImageSizeList: pxToRem(80),
        cardImageHeightGrid: pxToRem(200),
    },
} as const;