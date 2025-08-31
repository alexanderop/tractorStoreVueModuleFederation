export interface NavigationOptions {
  replace?: boolean
  state?: any
}

export function useNavigation() {
  /**
   * Navigate to a route programmatically
   */
  function navigateTo(to: string, options: NavigationOptions = {}) {
    window.dispatchEvent(
      new CustomEvent('mf:navigate', { 
        detail: { 
          to,
          replace: options.replace || false,
          state: options.state
        } 
      })
    )
  }

  /**
   * Replace current route
   */
  function replaceTo(to: string, options: Omit<NavigationOptions, 'replace'> = {}) {
    navigateTo(to, { ...options, replace: true })
  }

  /**
   * Go back in history
   */
  function goBack() {
    window.history.back()
  }

  /**
   * Go forward in history  
   */
  function goForward() {
    window.history.forward()
  }

  /**
   * Update current URL search params without navigation
   */
  function updateSearchParams(params: Record<string, string | null>) {
    const url = new URL(window.location.href)
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        url.searchParams.delete(key)
      } else {
        url.searchParams.set(key, value)
      }
    })

    window.history.replaceState(null, '', url.toString())
  }

  return {
    navigateTo,
    replaceTo,
    goBack,
    goForward,
    updateSearchParams
  }
}