import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function SocialMedia() {
  return (
    <div className="flex items-center gap-4 text-sm">
      <Link
        href="https://www.instagram.com/pasteldahora/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors"
      >
        <FaInstagram className="w-5 h-5" />
        <span>@pasteldahora</span>
      </Link>

      <Link
        href="https://wa.me/5581984758031?text=Olá!%20Tudo%20bem?%20Gostaria%20de%20conhecer%20o%20cardápio%20do%20Pastel%20da%20Hora.%20Poderiam%20me%20enviar,%20por%20favor?%20Obrigado!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span>(81) 98475-8031</span>
      </Link>
    </div>
  );
}
