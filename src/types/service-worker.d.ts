interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends ExtendableEvent {
  request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
}

// Extend ServiceWorkerGlobalScope if needed
interface ServiceWorkerGlobalScope {
  __WB_MANIFEST: string[];
}