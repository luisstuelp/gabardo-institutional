/**
 * Tests for UI utility components.
 * Covers ErrorBoundary, EmptyFallback, and Skeleton components.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { EmptyFallback } from '@/components/ui/EmptyFallback';
import { Skeleton, CardSkeleton, VehicleCardSkeleton, ProfileSkeleton, PageSkeleton } from '@/components/ui/Skeletons';
import { Search } from 'lucide-react';

/* ======================== ErrorBoundary ======================== */
describe('ErrorBoundary', () => {
    const ThrowError = () => {
        throw new Error('Test error');
    };

    it('should render children when no error', () => {
        render(
            <ErrorBoundary>
                <div>Hello</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should render fallback when error occurs', () => {
        // Suppress console.error for this test
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
        expect(screen.getByText('Tentar novamente')).toBeInTheDocument();

        spy.mockRestore();
    });

    it('should render custom fallback when provided', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <ErrorBoundary fallback={<div>Custom Error</div>}>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(screen.getByText('Custom Error')).toBeInTheDocument();

        spy.mockRestore();
    });

    it('should reset error state when retry is clicked', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });
        let shouldThrow = true;

        const MaybeThrow = () => {
            if (shouldThrow) throw new Error('Test');
            return <div>Recovered</div>;
        };

        render(
            <ErrorBoundary>
                <MaybeThrow />
            </ErrorBoundary>
        );

        expect(screen.getByText('Algo deu errado')).toBeInTheDocument();

        shouldThrow = false;
        fireEvent.click(screen.getByText('Tentar novamente'));

        expect(screen.getByText('Recovered')).toBeInTheDocument();

        spy.mockRestore();
    });
});

/* ======================== EmptyFallback ======================== */
describe('EmptyFallback', () => {
    it('should render default empty state', () => {
        render(<EmptyFallback />);
        expect(screen.getByText('Nada por aqui')).toBeInTheDocument();
        expect(screen.getByText('Não há dados para exibir no momento.')).toBeInTheDocument();
    });

    it('should render custom title and description', () => {
        render(
            <EmptyFallback
                title="Sem resultados"
                description="Tente ajustar os filtros"
            />
        );
        expect(screen.getByText('Sem resultados')).toBeInTheDocument();
        expect(screen.getByText('Tente ajustar os filtros')).toBeInTheDocument();
    });

    it('should render action button when provided', () => {
        const onClick = vi.fn();
        render(
            <EmptyFallback
                action={{ label: 'Criar novo', onClick }}
            />
        );
        const button = screen.getByText('Criar novo');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('should accept a custom icon', () => {
        render(<EmptyFallback icon={Search} />);
        // The component renders, we just verify no errors
        expect(screen.getByText('Nada por aqui')).toBeInTheDocument();
    });
});

/* ======================== Skeleton Components ======================== */
describe('Skeleton Components', () => {
    it('should render base Skeleton', () => {
        const { container } = render(<Skeleton className="h-4 w-20" />);
        expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('should render CardSkeleton', () => {
        const { container } = render(<CardSkeleton />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should render VehicleCardSkeleton', () => {
        const { container } = render(<VehicleCardSkeleton />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should render ProfileSkeleton', () => {
        const { container } = render(<ProfileSkeleton />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should render PageSkeleton', () => {
        const { container } = render(<PageSkeleton />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
