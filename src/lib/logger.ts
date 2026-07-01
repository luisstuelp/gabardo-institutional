/**
 * Comprehensive, structured logger for the Gabardo Trucks application.
 * Provides verbose, specific logging with module context.
 *
 * Usage:
 *   import { createLogger } from '@/lib/logger';
 *   const logger = createLogger('ModuleName');
 *   logger.info('Something happened', { userId: '123' });
 *
 * Singleton pattern: each module gets a named logger instance.
 */
import type { LogLevel, LogEntry } from '@/types/api';

/** Map to cache logger instances (singleton per module) */
const loggerInstances = new Map<string, Logger>();

/** Whether logging is enabled (can be toggled for tests) */
let loggingEnabled = true;

/** Minimum log level to output */
let minLogLevel: LogLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

/** Log level priority for comparison */
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

/**
 * Format a log entry into a readable console string.
 */
function formatLogEntry(entry: LogEntry): string {
    const timestamp = entry.timestamp;
    const prefix = `[${timestamp}] [${entry.level.toUpperCase()}] [${entry.module}]`;
    return `${prefix} ${entry.message}`;
}

/**
 * Output a log entry to the console with appropriate method.
 */
function outputLog(entry: LogEntry): void {
    if (!loggingEnabled) return;
    if (LOG_LEVEL_PRIORITY[entry.level] < LOG_LEVEL_PRIORITY[minLogLevel]) return;

    const formatted = formatLogEntry(entry);
    const consoleMethod = entry.level === 'debug' ? 'log' : entry.level;
    const args: unknown[] = [formatted];

    if (entry.data && Object.keys(entry.data).length > 0) {
        args.push(entry.data);
    }
    if (entry.error) {
        args.push(entry.error);
    }

    console[consoleMethod](...args);
}

/**
 * Logger class — each instance is scoped to a module name.
 */
export class Logger {
    constructor(private readonly module: string) { }

    private log(level: LogLevel, message: string, data?: Record<string, unknown>, error?: Error): void {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            module: this.module,
            message,
            data,
            error,
        };
        outputLog(entry);
    }

    /** Debug-level log — only in development */
    debug(message: string, data?: Record<string, unknown>): void {
        this.log('debug', message, data);
    }

    /** Info-level log — general operational messages */
    info(message: string, data?: Record<string, unknown>): void {
        this.log('info', message, data);
    }

    /** Warn-level log — potential issues */
    warn(message: string, data?: Record<string, unknown>): void {
        this.log('warn', message, data);
    }

    /** Error-level log — failures and exceptions */
    error(message: string, error?: Error, data?: Record<string, unknown>): void {
        this.log('error', message, data, error);
    }
}

/**
 * Create or retrieve a singleton logger instance for a module.
 * @param module - The module name (e.g., 'AuthService', 'VehicleAPI')
 */
export function createLogger(module: string): Logger {
    if (!loggerInstances.has(module)) {
        loggerInstances.set(module, new Logger(module));
    }
    return loggerInstances.get(module)!;
}

/**
 * Enable or disable all logging.
 */
export function setLoggingEnabled(enabled: boolean): void {
    loggingEnabled = enabled;
}

/**
 * Set the minimum log level.
 */
export function setMinLogLevel(level: LogLevel): void {
    minLogLevel = level;
}
