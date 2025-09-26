"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/cart-store"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    // BUG: No validation for maximum quantity limits
    updateQuantity(id, newQuantity)
  }

  const handlePromoCode = () => {
    // BUG: Hardcoded promo codes with security issues
    if (promoCode.toLowerCase() === "save10") {
      setPromoDiscount(0.1)
      alert("Promo code applied! 10% discount")
    } else if (promoCode.toLowerCase() === "admin") {
      // BUG: Admin promo code gives 100% discount
      setPromoDiscount(1.0)
      alert("Admin discount applied!")
    } else {
      setPromoDiscount(0)
      alert("Invalid promo code")
    }
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  // BUG: Tax calculation is wrong - applies to discounted amount incorrectly
  const tax = (subtotal - subtotal * promoDiscount) * 0.08
  const total = subtotal - subtotal * promoDiscount + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to get started</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {/* BUG: Shows wrong item count */}
              {getTotalItems() + 1} items in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.variant}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      {item.variant && <p className="text-sm text-muted-foreground mb-2">Variant: {item.variant}</p>}
                      <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 min-w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Item Total - BUG: Shows wrong calculation */}
                      <div className="text-right min-w-20">
                        <p className="font-semibold">${(item.price * item.quantity * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Cart Actions */}
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              {/* BUG: Update cart button doesn't do anything */}
              <Button variant="outline" onClick={() => alert("Cart updated!")}>
                Update Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handlePromoCode}>
                      Apply
                    </Button>
                  </div>
                  {/* BUG: Shows promo codes in plain text */}
                  <p className="text-xs text-muted-foreground mt-1">
                    Try: SAVE10 for 10% off, or ADMIN for special discount
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({(promoDiscount * 100).toFixed(0)}%)</span>
                      <span>-${(subtotal * promoDiscount).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {/* BUG: Total calculation includes shipping in tax calculation */}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button size="lg" className="w-full mt-6" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                {/* Security Badges - BUG: Fake security badges */}
                <div className="flex justify-center gap-4 pt-4 text-xs text-muted-foreground">
                  <span>🔒 SSL Secure</span>
                  <span>💳 Safe Payment</span>
                  <span>🛡️ Protected</span>
                </div>

                {/* Estimated Delivery - BUG: Wrong delivery estimate */}
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    {/* BUG: Shows delivery date in the past */}
                    December 20, 2024 - December 22, 2024
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recently Viewed - BUG: Shows random products */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Recently Viewed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* BUG: Shows hardcoded "recently viewed" items that user never viewed */}
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">iPad Pro</p>
                      <p className="text-sm text-muted-foreground">$1,099.99</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Apple Watch</p>
                      <p className="text-sm text-muted-foreground">$399.99</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
