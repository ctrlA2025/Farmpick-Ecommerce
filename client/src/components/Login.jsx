import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com'; // Import EmailJS
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = () => {
    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

    const [isSignUp, setIsSignUp] = React.useState(true); // Toggle between Sign Up and Login
    const [step, setStep] = React.useState(1); // Step state to control transitions
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [otp, setOtp] = React.useState(""); // State for OTP
    const [generatedOtp, setGeneratedOtp] = React.useState(""); // Store generated OTP
    const [otpVerified, setOtpVerified] = React.useState(false); // State for OTP verification
    const [password, setPassword] = React.useState("");
    const [passwordVisible, setPasswordVisible] = React.useState(false); // State for toggling password visibility

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const sendOtpHandler = async () => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        setGeneratedOtp(generatedOtp);

        const templateParams = {
            to_name: name,
            to_email: email,
            otp: generatedOtp,
        };

        try {
            await emailjs.send(
                'service_12lyrkq', // Replace with your EmailJS service ID
                'template_lr1iwkq', // Replace with your EmailJS template ID
                templateParams,
                'oLMFFwhse8y8oWg3S' // Replace with your EmailJS user ID
            );
            toast.success('OTP sent successfully to your email!');
            setStep(2); // Move to the next step
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const verifyOtpHandler = () => {
        if (otp === generatedOtp) {
            toast.success('OTP verified successfully!');
            setOtpVerified(true);
            setStep(3); // Move to the next step
        } else {
            toast.error('Invalid OTP. Please try again.');
        }
    };

    const onSignUpHandler = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.post(
                '/api/user/register',
                { name, email, password, mobile },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success('Account created successfully!');
                navigate('/'); // Navigate to the main site
                setUser(data.user);
                setShowUserLogin(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const onLoginHandler = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.post(
                '/api/user/login',
                { email, password },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success('Logged in successfully!');
                navigate('/'); // Navigate to the main site
                setUser(data.user);
                setShowUserLogin(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed inset-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50 overflow-y-auto"
        >
            <form
                onSubmit={isSignUp ? onSignUpHandler : onLoginHandler}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-6 m-auto items-start p-6 py-6 min-w-[340px] sm:w-[420px] max-w-full rounded-xl shadow-2xl border border-gray-200 bg-white mt-12 mb-8 h-auto max-h-[90vh] overflow-y-auto"
                style={{
                    boxShadow: "0 8px 32px 0 rgba(60,60,60,0.18), 0 1.5px 8px 0 rgba(60,60,60,0.10)"
                }}
            >
                <p className="text-2xl font-medium m-auto mb-2">
                    <span className="text-primary">{isSignUp ? 'User Sign Up' : 'User Login'}</span>
                </p>
                {isSignUp ? (
                    <>
                        {step === 1 && (
                            <>
                                <div className="w-full mb-4">
                                    <label className="block mb-2">Name</label>
                                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full h-12 p-3 outline-primary text-base" type="text" required />
                                </div>
                                <div className="w-full mb-4">
                                    <label className="block mb-2">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full h-12 p-3 outline-primary text-base" type="email" required />
                                </div>
                                <div className="w-full mb-4">
                                    <label className="block mb-2">Mobile No</label>
                                    <input onChange={(e) => setMobile(e.target.value)} value={mobile} placeholder="type here" className="border border-gray-200 rounded w-full h-12 p-3 outline-primary text-base" type="tel" pattern="[0-9]{10}" required />
                                </div>
                                <button type="button" onClick={sendOtpHandler} className="mt-2 bg-primary hover:bg-primary-dull transition-all text-white w-full py-3 rounded-md cursor-pointer text-base">
                                    Send OTP
                                </button>
                                <div className="w-full text-center mt-2">
                                    <button type="button" onClick={() => setIsSignUp(false)} className="text-gray-600">
                                        Already have an account? <span className="text-green-500">Login</span>
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="w-full mb-4">
                                    <label className="block mb-2">OTP</label>
                                    <input onChange={(e) => setOtp(e.target.value)} value={otp} placeholder="Enter OTP" className="border border-gray-200 rounded w-full h-12 p-3 outline-primary text-base" type="text" required />
                                </div>
                                <button type="button" onClick={verifyOtpHandler} className="mt-2 bg-primary hover:bg-primary-dull transition-all text-white w-full py-3 rounded-md cursor-pointer text-base">
                                    Verify OTP
                                </button>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className="w-full mb-4 relative">
                                    <label className="block mb-2">Password</label>
                                    <div className="relative">
                                        <input 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            value={password} 
                                            placeholder="type here" 
                                            className="border border-gray-200 rounded w-full h-12 p-3 outline-primary pr-12 text-base" 
                                            type={passwordVisible ? "text" : "password"} 
                                            required 
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-transparent border-none outline-none"
                                            tabIndex={-1}
                                            style={{padding: 0, margin: 0, height: "32px", width: "32px"}}
                                        >
                                            {passwordVisible ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-3 rounded-md cursor-pointer text-base">
                                    Submit
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div className="w-full mb-4">
                            <label className="block mb-2">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full h-12 p-3 outline-primary text-base" type="email" required />
                        </div>
                        <div className="w-full mb-4 relative">
                            <label className="block mb-2">Password</label>
                            <div className="relative">
                                <input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password} 
                                    placeholder="type here" 
                                    className="border border-gray-200 rounded w-full h-12 p-3 outline-primary pr-12 text-base" 
                                    type={passwordVisible ? "text" : "password"} 
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-transparent border-none outline-none"
                                    tabIndex={-1}
                                    style={{padding: 0, margin: 0, height: "32px", width: "32px"}}
                                >
                                    {passwordVisible ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-3 rounded-md cursor-pointer text-base">
                            Login
                        </button>
                        <div className="w-full text-center mt-2">
                            <button type="button" onClick={() => setIsSignUp(true)} className="text-gray-600">
                                Don't have an account? <span className="text-green-500">Sign Up</span>
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};


export default Login;
