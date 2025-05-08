import { useSession } from "next-auth/react";
import Chat from "@/components/Chat";
import Center from "@/components/Center";
import Header from "@/components/Header";

export default function ChatPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <Header/>
        <Center>
            <h1>Chat</h1>
            <Chat />
        </Center>
      
    </div>
  );
}