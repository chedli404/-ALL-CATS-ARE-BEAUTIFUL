import React from 'react'
import { motion } from 'framer-motion'

const Organisation = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const iconVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: (custom: number) => ({
            scale: 1,
            opacity: 1,
            transition: { delay: custom * 0.15, duration: 0.5 }
        })
    };

    return (
        <section id="organisation" className="bg-gradient-to-b from-gray-900 to-black py-20 px-4 min-h-screen overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-technos/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-anciens/5 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto max-w-7xl">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">Organisation Thématique</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body">Découvrez notre approche par catégories</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#64afd6] to-anciens mx-auto mt-6"></div>
                </motion.div>

                {/* Mobile view: Stack everything vertically */}
                <motion.div 
                    className="flex flex-col md:hidden gap-8 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Theme icons in single scrollable horizontal line */}
                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex gap-4 px-2 min-w-max">
                            {[
                                { src: "/attached_assets/ecologie.png", alt: "Écologie" },
                                { src: "/attached_assets/histoir.png", alt: "Histoire" },
                                { src: "/attached_assets/economie.png", alt: "Économie" },
                                { src: "/attached_assets/humanite.png", alt: "Humanité" },
                                { src: "/attached_assets/politique.png", alt: "Politique" }
                            ].map((img, index) => (
                                <motion.img 
                                    key={index}
                                    src={img.src} 
                                    alt={img.alt} 
                                    className="w-[140px] h-auto shadow-md rounded-lg" 
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    variants={itemVariants}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Description text */}
                    <motion.div className="w-full space-y-6" variants={itemVariants}>
                        <p className="text-gray-200 text-base leading-relaxed font-body">
                            Pour optimiser notre structure éditoriale, nous avons choisi de regrouper nos contenus en grands thèmes, chacun associé à un code couleur spécifique. cette approche permet à nos lecteurs de reconnaître rapidement le sujet ou l'orientation d'un document, facilitant ainsi une navigation intuitive à travers nos diverses publications.
                        </p>
                        
                        <div className="py-4 space-y-3 font-body">
                            <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Écologie</span> : Environnement, biodiversité, durabilité.</p>
                            <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Histoire</span> : Événements marquants, récits historiques.</p>
                            <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Économie</span> : Marchés, finances, développement durable.</p>
                            <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Humanité</span> : Sociologie, culture, relations humaines.</p>
                            <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Politique</span> : Gouvernance, droits humains, justice sociale.</p>
                        </div>
                    </motion.div>

                    {/* Team quote */}
                    <motion.p 
                        className="italic text-base text-gray-300 text-center mx-auto max-w-md border-l-4 border-[#64afd6] pl-4 py-2 font-body"
                        variants={itemVariants}
                    >
                        Notre équipe est composée de professionnels talentueux, chacun apportant une expertise unique. Ensemble, nous formons un groupe dédié à la création de contenus innovants et impactants, alliant créativité et stratégie pour réaliser notre vision et nos projets ambitieux.
                    </motion.p>

                    {/* Team image */}
                    <motion.div className="w-full max-w-md" variants={itemVariants}>
                        <img 
                            src="/attached_assets/team.png" 
                            alt="Notre équipe"
                            className="w-full h-auto object-contain rounded-lg shadow-xl border border-gray-800"
                        />
                    </motion.div>
                </motion.div>

                {/* Desktop view: Original layout with animations */}
                <div className="hidden md:block">
                    <div className="flex items-start justify-between px-4 lg:px-8">
                        {/* Theme icons column */}
                        <motion.div 
                            className="flex flex-col gap-4 w-1/4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { src: "/attached_assets/ecologie.png", alt: "Écologie" },
                                { src: "/attached_assets/histoir.png", alt: "Histoire" },
                                { src: "/attached_assets/economie.png", alt: "Économie" },
                                { src: "/attached_assets/humanite.png", alt: "Humanité" },
                                { src: "/attached_assets/politique.png", alt: "Politique" }
                            ].map((img, index) => (
                                <motion.div 
                                    key={index}
                                    className="overflow-hidden rounded-lg shadow-lg"
                                    custom={index}
                                    variants={iconVariants}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full max-w-[280px] h-auto object-cover"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Text content */}
                        <motion.div 
                            className="flex flex-col w-2/5 space-y-12"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <div className="space-y-6 text-lg lg:text-xl leading-relaxed font-body">
                                <p className="text-gray-200 mt-8">
                                    Pour optimiser notre structure éditoriale, nous avons choisi de regrouper nos contenus en grands thèmes, chacun associé à un code couleur spécifique. cette approche permet à nos lecteurs de reconnaître rapidement le sujet ou l'orientation d'un document, facilitant ainsi une navigation intuitive à travers nos diverses publications.
                                </p>
                                
                                <div className="py-6 space-y-3">
                                    <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Écologie</span> : Environnement, biodiversité, durabilité.</p>
                                    <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Histoire</span> : Événements marquants, récits historiques.</p>
                                    <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Économie</span> : Marchés, finances, développement durable.</p>
                                    <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Humanité</span> : Sociologie, culture, relations humaines.</p>
                                    <p className="text-gray-200"><span className="text-[#64afd6] font-semibold">Politique</span> : Gouvernance, droits humains, justice sociale.</p>
                                </div>

                                <div className="border-l-4 border-[#64afd6] pl-6 py-2 mt-12">
                                    <p className="italic text-lg lg:text-xl text-gray-300 font-body">
                                        Notre équipe est composée de professionnels talentueux,
                                        chacun apportant une expertise unique. Ensemble, nous formons
                                        un groupe dédié à la création de contenus innovants et impactants,
                                        alliant créativité et stratégie pour réaliser notre vision et nos projets ambitieux.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Team image */}
                        <motion.div 
                            className="w-1/3 flex justify-end"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                        >
                            <div className="overflow-hidden rounded-lg border border-gray-800 shadow-2xl">
                                <img 
                                    src="/attached_assets/team.png" 
                                    alt="Notre équipe"
                                    className="w-full max-w-[600px] lg:max-w-[800px] h-auto object-contain"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Organisation