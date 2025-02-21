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
                {/* Main Container with Padding */}
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex p-4">
                    {/* Login Form Section */}
                    <div className="w-1/2 pr-4 min-h-[500px] flex flex-col justify-center">
                        <div className="mb-8">
                            <img src="carlink.png" alt="Logo" className="h-14" />
                        </div>
                        
                        {isRegistering ? (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
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
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
                                    <p className="text-gray-600 text-sm">Please login to continue to your account.</p>
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
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
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
                    <div className="w-1/2 pl-4 min-h-[500px] flex items-center">
                        <img 
                            src="liquid.gif" 
                            alt="Login illustration" 
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex">
            <Nav />
            <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4" style={{ backgroundColor: '#F6F7FA' }}>
                {children}
            </div>
        </div>
    );
}
