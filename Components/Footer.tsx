import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

const Footer = () => {
  return (
    <footer className="text-primary-foreground bg-gradient-to-br from-black via-gray-900 to-gray-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-gray-700 to-cyan-600 bg-clip-text text-2xl font-extrabold text-transparent">
              AirFlex
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Elevate your game with next-gen sportswear, smart customization,
              and 3D tech. Airflex powers your performance both digitally and
              physically.
            </p>
            <div className="flex flex-wrap gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:text-secondary"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Shop Categories</h4>
            <ul className="space-y-2">
              {[
                'Performance Wear',
                'Sneakers & Footwear',
                'Customize Your Own',
                'Accessories',
                'Limited Editions',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Shipping & Returns', 'Size Guide'].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-primary-foreground/80 hover:text-secondary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Join Team Airflex</h4>
            <p className="text-primary-foreground/80">
              Get exclusive drops, early access, and performance updates
              straight to your inbox.
            </p>
            <div className="w-full max-w-md space-y-2">
              <Input
                placeholder="Enter your email"
                className="text-primary-foreground placeholder:text-primary-foreground/60 w-full border border-white/20 bg-white/10"
              />
              <Button variant="secondary" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col flex-wrap items-center justify-between gap-4 space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-primary-foreground/60 text-center text-sm">
              2024 Airflex. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-6 text-sm sm:justify-end">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-primary-foreground/60 hover:text-secondary transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
