import type { CSSProperties } from 'react';
import { tokens, pxToRem } from '../theme/tokens';

type ViewMode = 'grid' | 'list';

export const styles = {
    // Dynamic styles (accept viewMode)
    cardContainer: (viewMode: ViewMode): CSSProperties => ({
        display: 'flex',
        flexDirection: viewMode === 'list' ? 'row' : 'column',
        alignItems: viewMode === 'list' ? 'center' : 'stretch',
        gap: viewMode === 'list' ? tokens.spacing.xl : '0',
        padding: viewMode === 'list' ? tokens.spacing.lg : '0',
        border: `${pxToRem(1)} solid ${tokens.colors.border}`,
        borderRadius: viewMode === 'list' ? tokens.radii.md : tokens.radii.lg,
        backgroundColor: tokens.colors.surface,
        boxShadow: viewMode === 'list' ? tokens.shadows.cardList : tokens.shadows.cardGrid,
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
    }),

    imageWrapper: (viewMode: ViewMode): CSSProperties => ({
        width: viewMode === 'list' ? pxToRem(100) : '100%',
        height: viewMode === 'list' ? pxToRem(100) : tokens.components.cardImageHeightGrid,
        minWidth: viewMode === 'list' ? pxToRem(100) : 'auto',
        borderRadius: viewMode === 'list' ? tokens.radii.md : '0',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        backgroundColor: tokens.colors.border,
    }),

    content: (viewMode: ViewMode): CSSProperties => ({
        padding: viewMode === 'list' ? 0 : tokens.spacing.xl,
        display: 'flex',
        flexDirection: viewMode === 'list' ? 'row' : 'column',
        alignItems: viewMode === 'list' ? 'center' : 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        gap: tokens.spacing.md,
        minWidth: 0,
    }),

    // Static styles
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
    },

    textGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.xs,
        flex: 1,
        minWidth: 0,
    },

    title: {
        margin: 0,
        color: tokens.colors.textPrimary,
        fontSize: tokens.typography.fontSize.lg,
        fontWeight: tokens.typography.fontWeight.semibold,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
    },

    price: {
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.price,
        fontSize: tokens.typography.fontSize.lg,
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },

    description: {
        margin: 0,
        color: tokens.colors.textSecondary,
        fontSize: tokens.typography.fontSize.sm,
        lineHeight: tokens.typography.lineHeight.normal,
        textAlign: 'left',
        pointerEvents: 'auto',
        // Limit text to 2 lines and show ellipsis
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word', // Prevent overflow from long words without spaces
    },

    headerRowGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: tokens.spacing.md,
        width: '100%',
        minWidth: 0,
    },
} as const satisfies Record<string, CSSProperties | ((viewMode: ViewMode) => CSSProperties)>;