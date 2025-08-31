/**
 * Simple cart event bridge - no longer needed since cart store handles events directly
 * This file is kept for backward compatibility but can be removed
 * The cart store now initializes its own event listeners in stores/cartStore.ts
 */
export declare function initializeCartEventBridge(): () => void;
/**
 * This function is no longer needed since we removed Pinia
 */
export declare function getCartStore(): null;
