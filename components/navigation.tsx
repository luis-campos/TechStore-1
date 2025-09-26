"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"

export function Navigation() {
  const { getTotalItems } = useCartStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - BUG: Broken link */}
          <Link href="/broken-home" className="text-2xl font-bold text-primary">
            TechStore
          </Link>

          {/* Desktop Navigation - BUG: Missing mobile responsiveness */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              Products
            </Link>
            {/* BUG: Broken link */}
            <Link href="/categories-broken" className="text-foreground hover:text-accent transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </div>

          {/* Search Bar - BUG: No validation, XSS vulnerability */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                onChange={(e) => {
                  // BUG: XSS vulnerability - no sanitization
                  document.getElementById("search-results")!.innerHTML = `Searching for: ${e.target.value}`
                }}
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Shopping Cart - BUG: Still shows wrong count sometimes */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems() + 1}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - BUG: Poor mobile layout */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-card border-t">
            <Link href="/products" className="block px-4 py-2 text-foreground hover:bg-accent/10">
              Products
            </Link>
            <Link href="/categories-broken" className="block px-4 py-2 text-foreground hover:bg-accent/10">
              Categories
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-accent/10">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-foreground hover:bg-accent/10">
              Contact
            </Link>
            {/* BUG: Search bar overlaps on small screens */}
            <div className="px-4 py-2">
              <Input type="text" placeholder="Search..." className="w-full" />
            </div>
          </div>
        )}
      </div>

      {/* Hidden div for XSS demonstration */}
      <div id="search-results" className="hidden"></div>
    </nav>
  )
}
