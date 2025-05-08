import { useEffect, useContext } from "react";
import { useSession, signIn } from "next-auth/react";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Layout from "@/components/Layout";

export default function LoginPage() {
  const { data: session } = useSession();
  const { setUser } = useContext(CartContext);

  useEffect(() => {
    if (session?.user) {
      const userInfo = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role,
      };
      localStorage.setItem("currentUser", JSON.stringify(userInfo));
      setUser(userInfo);
    }
  }, [session]);

  const handleLogin = async (provider) => {
    await signIn(provider, {
      callbackUrl: process.env.NEXTAUTH_URL || "http://localhost:3001",
    });
  };

  return (
    <Layout>
      <Center>
        <Header>
          {!session ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => handleLogin("credentials")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Login with Email
              </button>
              <button
                onClick={() => handleLogin("google")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Login with Google
              </button>
            </div>
          ) : (
            <div className="text-blue-900 flex justify-between">
              <h2>
                Hello, <b>{session.user.name}</b>
              </h2>
              <div className="flex bg-gray-300 gap-1 p-2 text-black rounded-lg overflow-hidden">
                <img src={session.user.image} alt="" className="w-6 h-6" />
                <span className="px-2">{session.user.name}</span>
                {session.user.role === "admin" && <span>(Admin)</span>}
              </div>
            </div>
          )}
        </Header>
      </Center>
    </Layout>
  );
}