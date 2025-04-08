// Complete the page component implementation.
import React from 'react';
import { motion } from 'framer-motion';

const isLoading = false;




const WorldPage: React.FC = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6 }
        }
      };




    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                    >
                        {/* Background Image with Banner Art */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                           
                        </div>

                        <motion.h1 
                            className="font-display text-5xl mb-3 text-center text-white"
                            variants={itemVariants}
                        >
                           LE MONDE
                        </motion.h1>

                        <motion.div 
                            className="w-20 h-1 bg-gradient-to-r from-[#1c7f5f] via-[#e5ab47] to-[#c73e3a] mx-auto mb-6"
                            variants={itemVariants}
                        ></motion.div>

                        <motion.p 
                            className="text-gray-300 max-w-3xl mx-auto text-center mb-16"
                            variants={itemVariants}
                        >
                            Après la disparition de l'humanité, les chats survivants se sont organisés en tribus distinctes, chacune avec sa propre vision du monde et son approche face à l'héritage humain.
                        </motion.p>

                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-300 mt-4">Chargement world...</p>
                            </div>
                        ) : (
                            <>
                                {/* Main Tribe Banners Section */}
                                <div className="relative z-10">
                                    <img 
                                        src="/attached_assets/world1.jpeg" 
                                        alt="ACAB Tribe Banners" 
                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 md:mb-2"
                                    />
                                    <div className="relative z-10">
                                        <img 
                                            src="/attached_assets/world2.jpeg" 
                                            alt="ACAB Tribe Banners" 
                                            className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 md:mb-2"
                                        />
                                        <div className="relative z-10">
                                            <img 
                                                src="/attached_assets/world3.jpeg" 
                                                alt="ACAB Tribe Banners" 
                                                className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 md:mb-2"
                                            />
                                            <div className="relative z-10">
                                                <img 
                                                    src="/attached_assets/world4.jpeg" 
                                                    alt="ACAB Tribe Banners" 
                                                    className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 md:mb-2"
                                                />
                                                <div className="relative z-10">
                                                    <img 
                                                        src="/attached_assets/world5.jpeg" 
                                                        alt="ACAB Tribe Banners" 
                                                        className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 md:mb-2"
                                                    />
                                                    <div className="relative z-10">
                                                        <img 
                                                            src="/attached_assets/world6.jpeg" 
                                                            alt="ACAB Tribe Banners" 
                                                            className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 md:mb-2"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WorldPage;