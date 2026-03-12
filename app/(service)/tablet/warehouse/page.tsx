'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { InventoryItem } from '@/lib/service/types'
import {
  ArrowLeft, QrCode, Package, Search,
  Minus, Plus, CheckCircle, AlertTriangle,
} from 'lucide-react'

export default function WarehousePage() {
  const [scannedItem, setScannedItem] = useState<InventoryItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [scanning, setScanning] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([])

  async function handleScan() {
    setScanning(true)
    // Phase 5 will integrate html5-qrcode camera scanner
    // For now, show a placeholder
    setTimeout(() => {
      setScanning(false)
    }, 2000)
  }

  async function searchItems() {
    if (!searchQuery.trim()) return
    try {
      const res = await fetch(`/api/service/inventory?search=${encodeURIComponent(searchQuery)}`)
      if (res.ok) {
        const data = await res.json()
        setSearchResults(data.items || [])
      }
    } catch (err) {
      console.error('Search failed:', err)
    }
  }

  async function checkoutItem() {
    if (!scannedItem) return
    try {
      const res = await fetch('/api/service/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: scannedItem.id,
          quantity,
          type: 'checkout',
        }),
      })
      if (res.ok) {
        setCheckoutSuccess(true)
        setTimeout(() => {
          setCheckoutSuccess(false)
          setScannedItem(null)
          setQuantity(1)
        }, 2000)
      }
    } catch (err) {
      console.error('Checkout failed:', err)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 pt-2">
        <Link href="/tablet/dashboard">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Warehouse</h1>
      </div>

      {/* QR Scanner */}
      <Card>
        <CardContent className="p-6 text-center">
          {checkoutSuccess ? (
            <div className="py-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
              <p className="text-lg font-semibold text-green-700">Part Checked Out</p>
              <p className="text-sm text-gray-500 mt-1">
                {quantity}x {scannedItem?.name}
              </p>
            </div>
          ) : scanning ? (
            <div className="py-8">
              <div className="w-48 h-48 mx-auto border-4 border-dashed border-cyprus-300 rounded-2xl flex items-center justify-center bg-gray-50">
                <QrCode className="w-16 h-16 text-cyprus-400 animate-pulse" />
              </div>
              <p className="text-sm text-gray-500 mt-4">Point camera at QR code...</p>
              <Button variant="outline" onClick={() => setScanning(false)} className="mt-3">
                Cancel
              </Button>
            </div>
          ) : (
            <div className="py-4">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <Button
                onClick={handleScan}
                className="w-full h-14 text-lg gap-3 bg-cyprus-700 hover:bg-cyprus-800"
              >
                <QrCode className="w-6 h-6" />
                Scan QR Code
              </Button>
              <p className="text-xs text-gray-400 mt-3">
                Scan a part&apos;s QR label to check it out
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scanned Item Detail */}
      {scannedItem && !checkoutSuccess && (
        <Card className="border-cyprus-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Scanned Part</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold text-gray-900">{scannedItem.name}</p>
              <p className="text-sm text-gray-500">SKU: {scannedItem.sku}</p>
              <p className="text-sm text-gray-500">Location: {scannedItem.location_in_warehouse}</p>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="text-sm text-gray-600">In Stock</span>
              <span className={`font-bold text-lg ${
                scannedItem.current_stock <= scannedItem.min_stock
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}>
                {scannedItem.current_stock} {scannedItem.unit}
              </span>
            </div>

            {scannedItem.current_stock <= scannedItem.min_stock && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                Low stock warning
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.min(scannedItem.current_stock, quantity + 1))}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={checkoutItem}
              className="w-full h-12 text-base bg-cyprus-700 hover:bg-cyprus-800"
            >
              Check Out {quantity} {scannedItem.unit}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Manual Search */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Parts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchItems()}
              placeholder="Search by name or SKU..."
              className="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyprus-500 focus:border-transparent outline-none text-base"
            />
            <Button onClick={searchItems} className="h-12 px-4 bg-cyprus-700 hover:bg-cyprus-800">
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-3 space-y-2">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setScannedItem(item); setSearchResults([]) }}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.sku} &middot; {item.location_in_warehouse}</p>
                    </div>
                    <span className={`text-sm font-bold ${
                      item.current_stock <= item.min_stock ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.current_stock}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
