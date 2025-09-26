"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, Grid, List } from "lucide-react"

// Mock product data with intentional inconsistencies
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999.99,
    originalPrice: 1099.99,
    image: "/iphone-15-pro-hands.png",
    rating: 4.8,
    reviews: 1234,
    category: "smartphones",
    inStock: true,
    description: "Latest iPhone with titanium design",
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 2499.99,
    originalPrice: null,
    image: "/macbook-pro.png",
    rating: 4.9,
    reviews: 856,
    category: "laptops",
    inStock: true,
    description: "Powerful laptop for professionals",
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249.99,
    originalPrice: 279.99,
    image: "/airpods-pro-earbuds.jpg",
    rating: 4.7,
    reviews: 2341,
    category: "audio",
    inStock: false, // BUG: Shows as available but is out of stock
    description: "Premium wireless earbuds",
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    price: 899.99,
    originalPrice: 999.99,
    image: "/samsung-galaxy-smartphone.png",
    rating: 4.6,
    reviews: 987,
    category: "smartphones",
    inStock: true,
    description: "Android flagship with AI features",
  },
  {
    id: 5,
    name: "Dell XPS 13",
    price: 1299.99,
    originalPrice: null,
    image: "/dell-xps-laptop.jpg",
    rating: 4.5,
    reviews: 654,
    category: "laptops",
    inStock: true,
    description: "Compact and powerful ultrabook",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 399.99,
    originalPrice: 449.99,
    image: "/sony-headphones.png",
    rating: 4.8,
    reviews: 1876,
    category: "audio",
    inStock: true,
    description: "Industry-leading noise cancellation",
  },
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [priceRange, setPriceRange] = useState("")

  // BUG: Sorting doesn't work correctly for price
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = filterCategory === "all" || product.category === filterCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // BUG: Price sorting is broken - sorts as strings instead of numbers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price.toString().localeCompare(b.price.toString()) // BUG: String comparison instead of numeric
        case "price-high":
          return b.price.toString().localeCompare(a.price.toString()) // BUG: String comparison instead of numeric
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [sortBy, filterCategory, searchTerm])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground">Discover our complete collection of premium electronics</p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border">
          {/* Search - BUG: Search doesn't work on mobile */}
          <div className="flex-1 hidden md:block">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category Filter */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="smartphones">Smartphones</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="wearables">Wearables</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range - BUG: Doesn't actually filter */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-500">$0 - $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1000</SelectItem>
              <SelectItem value="1000+">$1000+</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Count - BUG: Shows wrong count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length + 2} of {products.length} products {/* BUG: Adds 2 to count */}
          </p>
        </div>

        {/* Product Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              {viewMode === "grid" ? (
                <>
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-4 overflow-hidden rounded-md bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">Sale</Badge>
                      )}
                      {/* BUG: Shows "In Stock" even for out of stock items */}
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">In Stock</Badge>
                    </div>

                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                    {/* BUG: Add to Cart button doesn't work */}
                    <Button variant="outline" onClick={() => alert("Feature not implemented!")}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </>
              ) : (
                // List view - BUG: Poor responsive design
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{product.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" asChild>
                            <Link href={`/products/${product.id}`}>View</Link>
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => alert("Feature not implemented!")}>
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* BUG: Pagination doesn't work */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline" onClick={() => alert("Pagination not implemented!")}>
              Next
            </Button>
          </div>
        </div>

        {/* No results message - BUG: Shows even when there are results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setFilterCategory("all")
                setSearchTerm("")
                setPriceRange("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* BUG: This message shows even when products are found */}
        <div className="text-center py-4 text-muted-foreground">
          <p>Can't find what you're looking for? Try adjusting your filters.</p>
        </div>
      </div>
    </div>
  )
}
