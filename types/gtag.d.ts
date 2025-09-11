declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'set' | 'event',
      targetId: string,
      config?: {
        event_category?: string
        event_label?: string
        value?: number
        [key: string]: any
      }
    ) => void
  }
}

export {}
