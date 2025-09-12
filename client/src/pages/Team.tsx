import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Chedli Frini",
      role: "Lead Developer & Project Manager",
      description: "Full-stack developer passionate about creating immersive digital experiences. Leads the technical development of the Kabila universe.",
      image: "/attached_assets/kab.png",

      social: {
        github: "https://github.com/chedlifrini",
        linkedin: "https://linkedin.com/in/chedlifrini",
        email: "chedli@kabila.art"
      }
    },
    {
      name: "Zied Ouerda",
      role: "Creative Director & Storyteller",
      description: "Visionary creator of the ACAB universe. Responsible for world-building, character development, and narrative design.",
      image: "/attached_assets/kab.png",
      social: {
        email: "zied@kabila.art",
        website: "https://ziedouerda.com"
      }
    },
    {
      name: "Sarra Bdiri",
      role: "Art Director & Visual Designer",
      description: "Talented artist bringing the post-apocalyptic world to life through stunning visuals and character illustrations.",
      image: "/attached_assets/kab.png",

      social: {
        email: "sarra@kabila.art",
        website: "https://sarrabdiri.art"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Meet the Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The passionate creators behind the Kabila universe. A diverse team of developers, artists, and storytellers working together to bring this post-apocalyptic world to life.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500/30"
                />
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 font-medium">{member.role}</p>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {member.description}
              </p>



              <div className="flex justify-center space-x-4">
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social.website && (
                  <a
                    href={member.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
                <a
                  href={`mailto:${member.social.email}?subject=Contact from Kabila Team Page&body=Hello ${member.name},%0D%0A%0D%0AI would like to get in touch with you regarding...`}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/30 rounded-xl p-8 border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Project Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">2+</div>
              <div className="text-gray-300">Years in Development</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-300">Characters Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">6</div>
              <div className="text-gray-300">Unique Tribes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">∞</div>
              <div className="text-gray-300">Possibilities</div>
            </div>
          </div>
        </motion.div>

        {/* Join Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Want to Join Our Team?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate creators, developers, and storytellers to help expand the Kabila universe. 
            If you're interested in contributing to this project, we'd love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;