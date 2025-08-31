export interface NavigationOptions {
    replace?: boolean;
    state?: any;
}
export declare function useNavigation(): {
    navigateTo: (to: string, options?: NavigationOptions) => void;
    replaceTo: (to: string, options?: Omit<NavigationOptions, "replace">) => void;
    goBack: () => void;
    goForward: () => void;
    updateSearchParams: (params: Record<string, string | null>) => void;
};
