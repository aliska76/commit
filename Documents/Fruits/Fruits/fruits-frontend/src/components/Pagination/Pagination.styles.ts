import type { CSSProperties } from 'react';
import { tokens, pxToRem } from '../../theme/tokens';

export const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: tokens.spacing.md,
        marginTop: tokens.spacing.xxl,
        width: '100%',
    },
    pageInfo: {
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.textSecondary,
        margin: `0 ${tokens.spacing.sm}`,
    },
    button: (isDisabled: boolean): CSSProperties => ({
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        borderRadius: tokens.radii.sm,
        border: `${pxToRem(1)} solid ${tokens.colors.border}`,
        backgroundColor: isDisabled ? tokens.colors.border : tokens.colors.surface,
        color: isDisabled ? tokens.colors.textSecondary : tokens.colors.primary,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontWeight: tokens.typography.fontWeight.semibold,
        fontSize: tokens.typography.fontSize.sm,
        opacity: isDisabled ? 0.6 : 1,
    }),
} as const satisfies Record<string, CSSProperties | ((isDisabled: boolean) => CSSProperties)>;