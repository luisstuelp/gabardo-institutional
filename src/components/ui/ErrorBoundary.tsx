/**
 * ErrorBoundary — Catches JavaScript errors in child components.
 * Prevents the entire app from crashing and shows a fallback UI.
 * Logs errors to the application logger.
 */
import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('ErrorBoundary');

interface ErrorBoundaryProps {
    children: ReactNode;
    /** Optional custom fallback UI */
    fallback?: ReactNode;
    /** Optional label for identifying which boundary caught the error */
    name?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        logger.error(`ErrorBoundary [${this.props.name ?? 'unnamed'}] caught error`, error, {
            componentStack: info.componentStack,
        });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                    <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/20 mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Algo deu errado
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md">
                        Ocorreu um erro inesperado. Tente recarregar esta seção.
                    </p>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre className="text-xs text-red-600 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg mb-4 max-w-lg overflow-auto text-left">
                            {this.state.error.message}
                        </pre>
                    )}
                    <button
                        onClick={this.handleReset}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#122d54] hover:bg-[#0d1f3d] rounded-lg transition-colors"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Tentar novamente
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
