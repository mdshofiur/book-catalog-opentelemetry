import { api } from '@opentelemetry/sdk-node';
import { setupTracing } from './tracer';

export const tracer = setupTracing('book-catalog-service');

export const span = tracer.startSpan('book-creation', {
   kind: api.SpanKind.CLIENT,
});
