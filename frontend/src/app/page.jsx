import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl text-center">
        Para usar el sistema
      </p>
      
      <Link href={"/login"}>
        <Button>presiona aqui</Button>
        </Link>
        
    </div>
  );
}
