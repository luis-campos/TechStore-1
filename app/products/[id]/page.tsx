"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

// Mock product data - same as products page
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999.99,
    originalPrice: 1099.99,
    images: ["/iphone-15-pro-hands.png", "/iphone-15-pro-back-view.jpg", "/iphone-15-pro-side-view.jpg"],
    rating: 4.8,
    reviews: 1234,
    category: "smartphones",
    inStock: true,
    stockCount: 15,
    description: "The iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system.",
    features: [
      "6.1-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 48MP main camera",
      "Titanium design with textured matte glass back",
      "USB-C connector",
      "Up to 23 hours video playback",
    ],
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Chip: "A17 Pro",
      Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      Storage: "128GB, 256GB, 512GB, 1TB",
      Battery: "Up to 23 hours video playback",
      "Water Resistance": "IP68",
    },
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 2499.99,
    originalPrice: null,
    images: ["/macbook-pro.png", "/macbook-pro-16-inch-open.jpg", "/macbook-pro-16-inch-closed.jpg"],
    rating: 4.9,
    reviews: 856,
    category: "laptops",
    inStock: true,
    stockCount: 8,
    description: "The most powerful MacBook Pro ever, with M3 Pro or M3 Max chip for extreme performance.",
    features: [
      "16.2-inch Liquid Retina XDR display",
      "M3 Pro or M3 Max chip",
      "Up to 128GB unified memory",
      "Up to 8TB SSD storage",
      "1080p FaceTime HD camera",
      "Six-speaker sound system with force-cancelling woofers",
    ],
    specifications: {
      Display: "16.2-inch Liquid Retina XDR",
      Chip: "M3 Pro or M3 Max",
      Memory: "18GB, 36GB, or 128GB unified memory",
      Storage: "512GB, 1TB, 2TB, 4TB, or 8TB SSD",
      Battery: "Up to 22 hours video playback",
      Weight: "4.7 pounds (2.14 kg)",
    },
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249.99,
    originalPrice: 279.99,
    images: ["/airpods-pro-earbuds.jpg", "/airpods-pro-in-case.jpg", "/airpods-pro-charging-case.jpg"],
    rating: 4.7,
    reviews: 2341,
    category: "audio",
    inStock: false,
    stockCount: 0,
    description: "AirPods Pro feature Active Noise Cancellation and Transparency mode.",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Adaptive Audio",
      "Personalized Spatial Audio",
      "Up to 6 hours listening time",
      "MagSafe Charging Case",
    ],
    specifications: {
      "Noise Cancellation": "Active Noise Cancellation",
      "Battery Life": "Up to 6 hours listening time",
      Connectivity: "Bluetooth 5.3",
      "Water Resistance": "IPX4",
      Case: "MagSafe Charging Case",
      Weight: "5.3 grams each",
    },
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState("128GB")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addItem } = useCartStore()

  useEffect(() => {
    // BUG: No error handling for invalid product IDs
    const foundProduct = products.find((p) => p.id === productId)
    setProduct(foundProduct)
  }, [productId])

  // BUG: No loading state or error handling
  if (!product) {
    return <div>Loading...</div>
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      variant: selectedVariant,
      quantity: quantity,
    })

    // BUG: Still shows alert instead of proper feedback
    alert(`Added ${quantity} ${product.name} to cart!`)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    // BUG: Allows negative quantities
    if (newQuantity >= 0) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-foreground">
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images - BUG: Doesn't handle missing images gracefully */}
            <div className="flex gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-accent" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                {/* BUG: Stock status shows wrong information */}
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.stockCount > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge className="bg-destructive text-destructive-foreground">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg">{product.description}</p>

            {/* Variant Selection - BUG: Doesn't affect price */}
            {product.id === 1 && (
              <div>
                <h3 className="font-semibold mb-3">Storage</h3>
                <div className="flex gap-2">
                  {["128GB", "256GB", "512GB", "1TB"].map((variant) => (
                    <Button
                      key={variant}
                      variant={selectedVariant === variant ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant)}
                      className="min-w-20"
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
                {/* BUG: Price doesn't update based on storage selection */}
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedVariant === "256GB" && "Add $100"}
                  {selectedVariant === "512GB" && "Add $300"}
                  {selectedVariant === "1TB" && "Add $500"}
                </p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-16 text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {/* BUG: Shows wrong stock count */}
                  {product.stockCount + 5} items available
                </span>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      {/* BUG: Inconsistent shipping information */}
                      <p className="text-sm text-muted-foreground">
                        {product.price > 50 ? "Free shipping on orders over $25" : "Shipping costs $9.99"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">30-Day Returns</p>
                      <p className="text-sm text-muted-foreground">Easy returns within 30 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">Warranty</p>
                      <p className="text-sm text-muted-foreground">1-year manufacturer warranty</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  {/* BUG: Reviews section is empty but shows loading message */}
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Loading reviews...</p>
                    {/* BUG: Reviews never actually load */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products - BUG: Shows same product in related items */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BUG: Shows the same product as related */}
            {[product, ...products.filter((p) => p.id !== product.id).slice(0, 3)].map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-md bg-muted">
                    <img
                      src={relatedProduct.images?.[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold">${relatedProduct.price}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${relatedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/products/${relatedProduct.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
