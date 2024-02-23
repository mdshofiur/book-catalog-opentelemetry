import { api } from '@opentelemetry/sdk-node';
import { setupTracing } from './tracer';

const tracer = setupTracing('book-operation-tracer');

export const span = tracer.startSpan('book-creation', {
   kind: api.SpanKind.CLIENT,
});
