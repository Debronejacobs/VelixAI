declare module '@rajesh896/broprint.js' {
    /**
     * Generates a unique browser fingerprint.
     * @returns {Promise<string>} A promise that resolves to the fingerprint string.
     */
    export function getCurrentBrowserFingerPrint(): Promise<string>;
}
