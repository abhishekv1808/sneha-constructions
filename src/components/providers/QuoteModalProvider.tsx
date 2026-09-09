'use client'

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface QuoteModalInitialData {
  serviceType?: string
  plotDimensions?: string
  builtUpArea?: string | number
  estimatedCost?: string
  packageTier?: string
  floors?: string
  locality?: string
  vastuFacing?: string
  source?: string
  message?: string
}

interface QuoteModalContextType {
  isOpen: boolean
  initialData: QuoteModalInitialData
  openQuoteModal: (data?: QuoteModalInitialData) => void
  closeQuoteModal: () => void
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined)

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState<QuoteModalInitialData>({})

  const openQuoteModal = useCallback((data?: QuoteModalInitialData) => {
    setInitialData(data || {})
    setIsOpen(true)
  }, [])

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <QuoteModalContext.Provider value={{ isOpen, initialData, openQuoteModal, closeQuoteModal }}>
      {children}
    </QuoteModalContext.Provider>
  )
}

export function useQuoteModal(): QuoteModalContextType {
  const context = useContext(QuoteModalContext)
  if (!context) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider')
  }
  return context
}
