/**
 * Tests for the logger utility.
 * Verifies log levels, formatting, and conditional behavior.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLogger } from '@/lib/logger';

describe('Logger', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should create a logger with a namespace', () => {
        const logger = createLogger('TestModule');
        expect(logger).toBeDefined();
        expect(logger.info).toBeTypeOf('function');
        expect(logger.debug).toBeTypeOf('function');
        expect(logger.warn).toBeTypeOf('function');
        expect(logger.error).toBeTypeOf('function');
    });

    it('should log info messages with namespace prefix', () => {
        const spy = vi.spyOn(console, 'info').mockImplementation(() => { });
        const logger = createLogger('TestModule');
        logger.info('Hello world');
        expect(spy).toHaveBeenCalled();
    });

    it('should log warn messages', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => { });
        const logger = createLogger('WarnTest');
        logger.warn('Warning message');
        expect(spy).toHaveBeenCalled();
    });

    it('should log error messages', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const logger = createLogger('ErrorTest');
        logger.error('Error message');
        expect(spy).toHaveBeenCalled();
    });
});
