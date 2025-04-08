import { Link } from "wouter";
import { Facebook, Twitter, Instagram, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              
              <h3 className="font-display text-2xl text-white tracking-widest  " >Kabila</h3>
            </div>
            <p className="text-gray-500 mt-2 text-center md:text-left">All Cats Are Beautiful - L'Héritage</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-display text-lg text-white mb-4">Univers</h4>
              <ul className="space-y-2">
                <li><Link href="/world" className="text-gray-400 hover:text-white transition-colors">Le Monde</Link></li>
                <li><Link href="/tribes" className="text-gray-400 hover:text-white transition-colors">Tribus</Link></li>
                <li><Link href="/characters" className="text-gray-400 hover:text-white transition-colors">Personnages</Link></li>
                <li><Link href="/map" className="text-gray-400 hover:text-white transition-colors">Carte</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg text-white mb-4">Créations</h4>
              <ul className="space-y-2">
                <li><Link href="/legends" className="text-gray-400 hover:text-white transition-colors">BD & Animés</Link></li>
                <li><Link href="/game" className="text-gray-400 hover:text-white transition-colors">Jeu de Société</Link></li>
                <li><Link href="/artifacts" className="text-gray-400 hover:text-white transition-colors">Illustrations</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Boutique</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg text-white mb-4">Projet</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">À Propos</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Équipe</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg text-white mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-600 text-center text-sm">
            © 2023 ACAB - All Cats Are Beautiful. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
