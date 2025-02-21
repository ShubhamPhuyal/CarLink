import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/nav";

export default function Layout({ children }) {
    const { data: session } = useSession();
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result.error) {
            alert(result.error);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            alert("Registration successful! Please log in.");
            setIsRegistering(false);
        } else {
            alert(data.error);
        }
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex pt-4 pb-4 pr-4">
                    {/* Login Form Section */}
                    <div className="w-1/2 p-8 md:p-10 flex flex-col">
                        <div className="mb-14">
                            <img src="carlink.png" alt="Logo" className="h-14" />
                        </div>
                        
                        {isRegistering ? (
                            <div className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
                                    <p className="text-gray-600 text-sm">Please register to continue to your account.</p>
                                </div>
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Register
                                    </button>
                                </form>
                                <p className="text-gray-600 text-center text-sm">
                                    Already have an account?{" "}
                                    <button type="button" onClick={() => setIsRegistering(false)} className="text-blue-600 hover:text-blue-700 font-medium">
                                        Sign in
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
                                    <p className="text-gray-600 text-l ">Please login to continue to your account.</p>
                                </div>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-4">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Sign in
                                    </button>
                                </form>
                                
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-2 bg-white text-sm text-gray-500">or</span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => signIn("google")}
                                    type="button"
                                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg viewBox="0 0 48 48" className="w-5 h-5">
                                        <path
                                            fill="#EA4335"
                                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                        />
                                        <path
                                            fill="#4285F4"
                                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                        />
                                    </svg>
                                    Sign in with Google
                                </button>
                                
                                <p className="text-gray-600 text-center text-sm">
                                    Need an account?{" "}
                                    <button type="button" onClick={() => setIsRegistering(true)} className="text-blue-600 hover:text-blue-700 font-medium">
                                        Create one
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Image Section */}
                    <div className="w-1/2 ">
                        <img 
                            src="liquid.gif" 
                            alt="Login illustration" 
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex ">
            <Nav />
            <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4" style={{ backgroundColor: '#F6F7FA' }}>
                {children}
            </div>
        </div>
    );
}