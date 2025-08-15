import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="h-18 w-40 p-2" src={assets.logo3} alt="logo" />
                    <p className="max-w-[410px] mt-6">
                        We deliver fresh groceries and vegetables straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
                    </p>
                </div>

                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">Quick Links</h3>
                        <ul className="text-sm space-y-1">
                            <li><a href="/" className="hover:underline transition">Home</a></li>
                            <li><a href="/#best-sellers" className="hover:underline transition">Best Sellers</a></li>
                            <li><a href="/contact" className="hover:underline transition">Contact Us</a></li>
                            <li><a href="/faq" className="hover:underline transition">FAQs</a></li> {/* ✅ Fixed route */}
                        </ul>
                    </div>

                    {/* Need Help */}
                    <div>
                        <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">Need help?</h3>
                        <ul className="text-sm space-y-1">
                            <li><a href="/deliveryinfo" className="hover:underline transition">Delivery Information</a></li>
                            <li><a href="/return-policy" className="hover:underline transition">Return & Refund Policy</a></li>
                            <li><a href="/my-orders" className="hover:underline transition">Track your Order</a></li>
                            <li><a href="/contact" className="hover:underline transition">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">Follow Us</h3>
                        <ul className="text-sm space-y-1">
                            <li><a href="https://www.instagram.com/farm_pick_/" target="_blank" rel="noopener noreferrer" className="hover:underline transition">Instagram</a></li>
                            <li><a href="https://x.com/Dharanidha52756" target="_blank" rel="noopener noreferrer" className="hover:underline transition">Twitter</a></li>
                            <li><a href="https://www.linkedin.com/in/farm-pick-268b48352/" target="_blank" rel="noopener noreferrer" className="hover:underline transition">Facebook</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
  Copyright {new Date().getFullYear()} ©{' '}
  <a
    href="https://akstackdev.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-600 hover:underline"
  >
    AKStack.dev
  </a>{' '}
  | Farmpick All Rights Reserved.
</p>

        </div>
    );
};

export default Footer;
