import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TRIBES_DATA } from "@/lib/constants.ts";
import { Tribe } from "@/types";
import TribeBanner from "@/components/ui/TribeBanner.tsx";

const Tribes = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  
  const isSection1InView = useInView(section1Ref, { once: false, amount: 0.2 });
  const isSection2InView = useInView(section2Ref, { once: false, amount: 0.2 });
  const isSection3InView = useInView(section3Ref, { once: false, amount: 0.2 });

  const { data: tribes, isLoading } = useQuery<Tribe[]>({
    queryKey: ["/api/tribes"],
    initialData: TRIBES_DATA
  });

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section ref={section1Ref} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">LES TRIBUS</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Après la disparition de l'humanité, les chats survivants se sont organisés en tribus distinctes, 
              chacune avec sa propre vision du monde et son approche face à l'héritage humain.
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-300 mt-4">Chargement des tribus...</p>
            </div>
          ) : (
            <div>
              {/* Main Tribe Banners Section - Gallery */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <img 
                  src="/attached_assets/trib1.jpeg" 
                  alt="ACAB Tribe Banners" 
                  className="w-full rounded-lg shadow-2xl"
                />
                <img 
                  src="/attached_assets/trib2.jpeg" 
                  alt="ACAB Tribe Banners" 
                  className="w-full rounded-lg shadow-2xl"
                />
                <img 
                  src="/attached_assets/trib3.jpeg" 
                  alt="ACAB Tribe Banners" 
                  className="w-full rounded-lg shadow-2xl"
                />
                <img 
                  src="/attached_assets/trib4.jpeg" 
                  alt="ACAB Tribe Banners" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
                
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-24 max-w-5xl mx-auto">
                {tribes.map((tribe, index) => (
                  <TribeBanner 
                    key={tribe.id} 
                    name={tribe.name}
                    description={tribe.description}
                    color={tribe.color}
                    strengths={tribe.strengths}
                    icon={tribe.icon}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* History Section */}
      <section ref={section2Ref} className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#64afd6]">
              HISTOIRE DES TRIBUS
            </h2>
            
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSection2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7 }}
                className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#E3A947]">L'ÈRE DE L'ÉMERGENCE (2050-2080)</h3>
                <p className="text-gray-300">
                  Après la Grande Catastrophe qui vit l'humanité disparaître, les chats commencèrent à développer une intelligence supérieure, probablement due aux mutations causées par les radiations résiduelles et les expériences génétiques abandonnées par les humains.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSection2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#1C6E5F]">LA DIVERGENCE (2080-2090)</h3>
                <p className="text-gray-300">
                  Les différentes populations félines commencèrent à s'organiser différemment selon les territoires et les ressources disponibles. Les premières tribus se formèrent autour de philosophies distinctes liées à leur environnement et à leur relation avec l'héritage humain.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSection2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#C73E3A]">L'ÉTABLISSEMENT (2090-PRÉSENT)</h3>
                <p className="text-gray-300">
                  Les six grandes tribus que nous connaissons aujourd'hui se sont consolidées, chacune développant sa propre culture, ses rituels et ses avancées technologiques ou spirituelles. Des systèmes d'alliance et de commerce entre elles ont lentement émergé.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section ref={section3Ref} className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#64afd6]">
            COMPARAISON DES TRIBUS
          </h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSection3InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left text-lg font-semibold text-white">Tribu</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-white">Philosophie</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-white">Relation à la Technologie</th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-white">Organisation Sociale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="py-4 px-6" style={{ color: "#1C6E5F" }}>Écologistes</td>
                  <td className="py-4 px-6 text-gray-300">Harmonie avec la nature</td>
                  <td className="py-4 px-6 text-gray-300">Minimaliste, technologies vertes</td>
                  <td className="py-4 px-6 text-gray-300">Communautés égalitaires</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="py-4 px-6" style={{ color: "#C73E3A" }}>Technos</td>
                  <td className="py-4 px-6 text-gray-300">Progrès par l'innovation</td>
                  <td className="py-4 px-6 text-gray-300">Avancée, améliorations cybernétiques</td>
                  <td className="py-4 px-6 text-gray-300">Hiérarchie méritocratique</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="py-4 px-6" style={{ color: "#E3A947" }}>Anciens</td>
                  <td className="py-4 px-6 text-gray-300">Préservation du savoir</td>
                  <td className="py-4 px-6 text-gray-300">Conservatrice, préservation</td>
                  <td className="py-4 px-6 text-gray-300">Conseil des sages</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="py-4 px-6" style={{ color: "#39C9C9" }}>Nomades</td>
                  <td className="py-4 px-6 text-gray-300">Liberté et adaptation</td>
                  <td className="py-4 px-6 text-gray-300">Pragmatique, technologies mobiles</td>
                  <td className="py-4 px-6 text-gray-300">Groupes familiaux autonomes</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="py-4 px-6" style={{ color: "#9C4DC4" }}>Mystiques</td>
                  <td className="py-4 px-6 text-gray-300">Spiritualité et mystère</td>
                  <td className="py-4 px-6 text-gray-300">Fusion tech-spirituelle</td>
                  <td className="py-4 px-6 text-gray-300">Ordres initiatiques</td>
                </tr>
                <tr className="hover:bg-gray-900">
                  <td className="py-4 px-6" style={{ color: "#64AFD6" }}>Électriques</td>
                  <td className="py-4 px-6 text-gray-300">Énergie et vitalité</td>
                  <td className="py-4 px-6 text-gray-300">Énergétique, pulsative</td>
                  <td className="py-4 px-6 text-gray-300">Réseau de courants</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Tribes;