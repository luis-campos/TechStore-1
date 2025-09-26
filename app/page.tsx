import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {"Discover the Future of "}
              <span className="text-accent">Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Explore our curated collection of cutting-edge electronics, gadgets, and accessories designed to enhance
              your digital lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {/* BUG: Broken link */}
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/learn-more-404">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories - BUG: Layout breaks on mobile */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>

          {/* BUG: Grid doesn't respond properly on mobile */}
          <div className="grid grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold mb-2">Smartphones</h3>
                <p className="text-sm text-muted-foreground">Latest models</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="font-semibold mb-2">Laptops</h3>
                <p className="text-sm text-muted-foreground">High performance</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎧</span>
                </div>
                <h3 className="font-semibold mb-2">Audio</h3>
                <p className="text-sm text-muted-foreground">Premium sound</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⌚</span>
                </div>
                <h3 className="font-semibold mb-2">Wearables</h3>
                <p className="text-sm text-muted-foreground">Smart devices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              {/* BUG: Inconsistent messaging */}
              <p className="text-muted-foreground">Free delivery on orders over $50*</p>
              <p className="text-xs text-muted-foreground mt-1">*Conditions apply, minimum $100 required</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">Your data is safe with us</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              {/* BUG: Wrong support hours */}
              <p className="text-muted-foreground">Available Monday-Friday 9AM-5PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - BUG: No email validation */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">Get the latest deals and product updates</p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              // BUG: No validation, accepts invalid emails
            />
            <Button>Subscribe</Button>
          </div>
          {/* BUG: Misleading privacy statement */}
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy and will never share your email with third parties.
            <br />
            <span className="text-[8px]">*Email may be shared with marketing partners for promotional purposes</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">TechStore</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for cutting-edge technology and electronics.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground">
                    Products
                  </Link>
                </li>
                {/* BUG: More broken links */}
                <li>
                  <Link href="/deals-404" className="text-muted-foreground hover:text-foreground">
                    Deals
                  </Link>
                </li>
                <li>
                  <Link href="/support-broken" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {/* BUG: Social links don't work */}
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TechStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
