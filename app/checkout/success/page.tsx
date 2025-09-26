"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function CheckoutSuccessPage() {
  // BUG: No actual order data, just placeholder
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Package className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Order Number</h3>
                <p className="text-muted-foreground">{orderNumber}</p>
              </div>
              <div>
                <Mail className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Confirmation Email</h3>
                <p className="text-muted-foreground">Sent to your email</p>
              </div>
              <div>
                <Truck className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Estimated Delivery</h3>
                {/* BUG: Shows wrong delivery date */}
                <p className="text-muted-foreground">Dec 25, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            {/* BUG: Order tracking link doesn't work */}
            <Button variant="outline" asChild>
              <Link href="/track-order-404">Track Your Order</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Questions about your order?{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
