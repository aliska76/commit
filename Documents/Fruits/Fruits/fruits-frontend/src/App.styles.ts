import type { CSSProperties } from 'react';
import { tokens, pxToRem } from './theme/tokens';

type ViewMode = 'grid' | 'list';

export const styles = {
    // Static layout styles
    container: {
        maxWidth: pxToRem(1200),
        width: '100%',
        margin: '0 auto',
        padding: `${tokens.spacing.xxl} ${tokens.spacing.xl}`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
    },
    header: {
        marginBottom: tokens.spacing.xxl,
        textAlign: 'center',
    },
    title: {
        color: tokens.colors.primary,
        marginBottom: tokens.spacing.sm,
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.bold,
    },
    subtitle: {
        color: tokens.colors.textSecondary,
        margin: 0,
        fontSize: tokens.typography.fontSize.base,
    },
    controlsArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: tokens.spacing.lg,
        marginBottom: tokens.spacing.xxl,
        width: '100%',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
    },
    searchInput: {
        padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
        fontSize: tokens.typography.fontSize.base,
        borderRadius: tokens.radii.md,
        border: `${pxToRem(1)} solid ${tokens.colors.border}`,
        width: '100%',
        maxWidth: pxToRem(400),
        boxShadow: 'inset 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box',
        outline: 'none',
    },
    viewModeGroup: {
        display: 'flex',
        gap: tokens.spacing.sm,
        flexShrink: 0,
    },
    viewButton: {
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
        borderRadius: tokens.radii.sm,
        border: `${pxToRem(1)} solid ${tokens.colors.border}`,
        cursor: 'pointer',
        fontWeight: tokens.typography.fontWeight.semibold,
        fontSize: tokens.typography.fontSize.sm,
    },
    loadingState: {
        textAlign: 'center',
        padding: tokens.spacing.xxl,
        fontSize: tokens.typography.fontSize.lg,
        color: tokens.colors.textSecondary,
    },
    errorState: {
        padding: tokens.spacing.xl,
        backgroundColor: tokens.colors.errorBg,
        color: tokens.colors.errorText,
        borderRadius: tokens.radii.md,
        border: `${pxToRem(1)} solid ${tokens.colors.errorBorder}`,
        fontWeight: tokens.typography.fontWeight.medium,
        textAlign: 'center',
    },
    emptyState: {
        textAlign: 'center',
        color: tokens.colors.textSecondary,
        padding: tokens.spacing.xxl,
        fontSize: tokens.typography.fontSize.lg,
    },

    // Dynamic layout functions
    grid: (viewMode: ViewMode): CSSProperties => ({
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
        gap: tokens.spacing.xxl,
        width: '100%',
        boxSizing: 'border-box',
    }),

    button: (isActive: boolean): CSSProperties => ({
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
        borderRadius: tokens.radii.sm,
        cursor: 'pointer',
        fontWeight: tokens.typography.fontWeight.semibold,
        fontSize: tokens.typography.fontSize.sm,
        backgroundColor: isActive ? tokens.colors.primary : tokens.colors.surface,
        color: isActive ? tokens.colors.surface : tokens.colors.primary,
        border: `${pxToRem(1)} solid ${isActive ? tokens.colors.primary : tokens.colors.border}`,
    }),
} as const satisfies Record<string, CSSProperties | ((arg: any) => CSSProperties)>;