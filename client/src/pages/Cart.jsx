import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
    const {
        products, currency, cartItems,
        removeFromCart, getCartCount,
        updateCartItem, navigate, getCartAmount,
        axios, user, setCartItems
    } = useAppContext();

    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    const cartArray = Object.keys(cartItems)
        .filter((key) => {
            const [productId, variantIndex] = key.split("|");
            const qty = cartItems[key];
            const validProduct = products.some(p => p._id === productId);
            return qty > 0 && validProduct;
        })
        .map((key) => {
            const [productId, variantIndex] = key.split("|");
            const product = products.find(item => item._id === productId);
            const variant = product?.variants?.[variantIndex] || {};
            return { ...product, variant, variantIndex, quantity: cartItems[key], cartKey: key };
        });




    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);


    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const placeOrder = async () => {
        try {
            if (!selectedAddress) return toast.error("Please select an address");

            const payload = {
                userId: user._id,
                items: cartArray.map(item => ({
                    product: item._id,
                    variantIndex: item.variantIndex,
                    quantity: item.quantity
                })),
                address: selectedAddress._id
            };

            if (paymentOption === "COD") {
                const { data } = await axios.post('/api/order/cod', payload);
                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            } else {
                // ✅ 1️⃣ Create Razorpay order on backend
                const { data } = await axios.post('/api/order/razorpay', payload);
                console.log("Razorpay Key:", data.key); // ✅ Debug: Check if live key is being used
                if (!data.success) return toast.error("Failed to create Razorpay order");

                // ✅ 2️⃣ Open Razorpay checkout
                const options = {
                    key: data.key, // Ensure this is the live key
                    amount: data.amount,
                    currency: data.currency,
                    name: "Farmpick",
                    description: "Order Payment",
                    order_id: data.orderId,
                    handler: async (response) => {
                        // ✅ Verify payment signature on server
                        const verifyPayload = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: data.orderDbId,
                            userId: user._id,
                        };
                        const verifyRes = await axios.post("/api/order/razorpay/verify", verifyPayload);
                        if (verifyRes.data.success) {
                            toast.success("Payment Verified & Order Placed!");
                            setCartItems({});
                            navigate("/my-orders");
                        } else {
                            toast.error(verifyRes.data.message);
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone,
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };



    useEffect(() => {
        if (user) getUserAddress();
    }, [user]);

    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] py-4 border-b border-gray-200">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                scrollTo(0, 0);
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.variant.weight} {product.variant.unit}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select
                                             onChange={e => updateCartItem(product.cartKey, Number(e.target.value))}
                                            value={product.quantity}
                                            className='outline-none ml-2'
                                        >
                                            {Array(Math.max(product.quantity, 9)).fill('').map((_, idx) => (
                                                <option key={idx} value={idx + 1}>{idx + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center">{currency}{product.variant.offerPrice * product.quantity}</p>

                        <button onClick={() => removeFromCart(product.cartKey)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => { navigate("/products"); scrollTo(0, 0); }}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
                >
                    <img className="group-hover:-translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="arrow" />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Add address
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {/* Debug: show user info */}
                                {/* Remove this after debugging */}
                                {/* <pre style={{fontSize: 10, color: 'red'}}>{JSON.stringify(user)}</pre> */}
                                {addresses.map((address, idx) => (
                                    <p key={idx} onClick={() => { setSelectedAddress(address); setShowAddress(false); }} className="text-gray-500 p-2 hover:bg-gray-100">
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p
                                    className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                                    onClick={() => {
                                        // Fix: check for user.email instead of user._id
                                        if (user && user.email) {
                                            navigate("/add-address");
                                        } else {
                                            navigate("/login?redirect=/add-address");
                                        }
                                    }}
                                >
                                    your address here
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select onChange={e => setPaymentOption(e.target.value)} value={paymentOption} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>
                            {currency}{(getCartAmount() * 1.02).toFixed(2)}
                        </span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null;
};


export default Cart;
