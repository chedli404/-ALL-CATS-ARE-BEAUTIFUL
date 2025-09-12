import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Book, Bookmark } from "lucide-react";

const Legends = () => {
  const [userPollStatuses, setUserPollStatuses] = useState<{ [pollId: string]: any }>({});
  // Helper to fetch user poll statuses
  const fetchUserPollStatuses = async () => {
    if (!user || !user.username) return;
    const statuses: { [pollId: string]: any } = {};
    await Promise.all(polls.map(async (poll: any) => {
      const res = await fetch(`/api/polls/${poll._id}/user-status`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        try {
          statuses[poll._id] = await res.json();
        } catch (jsonError) {
          // If JSON parsing fails, treat as no status
          statuses[poll._id] = null;
        }
      } else if (res.status === 404 && res.headers.get('content-type')?.includes('application/json')) {
        // Gracefully handle 404 JSON error response
        statuses[poll._id] = null;
      } else {
        // Only log unexpected errors
        statuses[poll._id] = null;
      }
    }));
    setUserPollStatuses(statuses);
  };
  const [polls, setPolls] = useState<any[]>([]);
  const [pollOptions, setPollOptions] = useState<{ [pollId: string]: any[] }>({});
  const [selectedOption, setSelectedOption] = useState<{ [pollId: string]: string | null }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    fetchPolls();
    // Fetch user poll statuses for each poll if user is logged in
    if (user) {
      fetchUserPollStatuses();
    }
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await fetch('/api/polls');
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        const pollsData = await res.json();
        setPolls(pollsData);
        // Fetch options for each poll
        const optionsObj: { [pollId: string]: any[] } = {};
        await Promise.all(pollsData.map(async (poll: any) => {
          const optRes = await fetch(`/api/polls/${poll._id}/voteoptions`);
          if (optRes.ok && optRes.headers.get('content-type')?.includes('application/json')) {
            optionsObj[poll._id] = await optRes.json();
          } else {
            optionsObj[poll._id] = [];
          }
        }));
        setPollOptions(optionsObj);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (pollId: string, optionId: string) => {
    if (!user) {
      alert("Connectez-vous pour voter!");
      return;
    }
    setSelectedOption(prev => ({ ...prev, [pollId]: optionId }));
  };

  const submitVote = async (pollId: string) => {
    if (!selectedOption[pollId] || !user) return;
    setIsSubmitting(true);
    try {
      const username = user?.username;
      if (!username) {
        alert('Username is missing. Please log in again.');
        setIsSubmitting(false);
        return;
      }
      const token = localStorage.getItem('token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const requestBody = { optionId: selectedOption[pollId], username };
      const res = await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });

      if (res.status === 201) {
        await fetchPolls(); // Refresh data
        await fetchUserPollStatuses(); // Refresh user status
        alert("Vote soumis avec succès!");
        setSelectedOption(prev => ({ ...prev, [pollId]: null }));
      } else {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const error = await res.json();
            alert(error.message || "Failed to vote");
          } catch (jsonError) {
            alert("Erreur JSON inattendue.");
          }
        } else {
          alert("Une erreur inattendue est survenue (réponse non-JSON).");
        }
      }
    } catch (error) {
      alert("Failed to submit vote: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const episodes = [
    {
      id: 1,
      episode: 1,
      title: "L'Éveil des Nomades",
      description: "Dans un monde post-apocalyptique, les premiers chats survivants découvrent leur nouvelle réalité.",
      image: "/attached_assets/episode1.jpg",
      duration: "24 min"
    },
    {
      id: 2,
      episode: 2,
      title: "Les Territoires Perdus",
      description: "Les tribus explorent les ruines de l'ancienne civilisation humaine.",
      image: "/attached_assets/episode2.jpg",
      duration: "26 min"
    },
    {
      id: 3,
      episode: 3,
      title: "La Technologie Oubliée",
      description: "Découverte d'anciens artefacts technologiques qui changent tout.",
      image: "/attached_assets/episode3.jpg",
      duration: "28 min"
    }
  ];

  const comics = [
    {
      id: 1,
      title: "Origines: Les Premiers Jours",
      description: "L'histoire des premiers survivants félins après la catastrophe.",
      author: "Marie Dubois",
      pages: 48,
      image: "/attached_assets/comic1.jpg"
    },
    {
      id: 2,
      title: "Chroniques des Nomades",
      description: "Les aventures épiques de la tribu des Nomades à travers les terres désolées.",
      author: "Jean Martin",
      pages: 64,
      image: "/attached_assets/comic2.jpg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h1 className="font-display text-6xl text-white mb-6 bg-gradient-to-r from-technos to-anciens bg-clip-text text-transparent">
              LÉGENDES D'ACAB
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Plongez dans l'univers riche et complexe d'All Cats Are Beautiful à travers nos séries animées, 
              bandes dessinées et contenus interactifs.
            </p>
          </motion.div>

          {/* Animated Series Section */}
          <motion.div className="mb-24" variants={itemVariants}>
            <div className="flex items-center mb-8">
              <h2 className="font-display text-3xl text-white flex items-center">
                <PlayCircle className="mr-3 h-8 w-8 text-technos" />
                SÉRIE ANIMÉE
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {episodes.map((episode, index) => (
                <motion.div 
                  key={episode.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative">
                    <img 
                      src={episode.image} 
                      alt={episode.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black/70 px-3 py-1 m-2 rounded text-xs font-tech text-white">
                      {episode.duration}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                      <div className="flex justify-between items-end">
                        <span className="text-white font-tech text-sm">
                          Épisode {episode.episode}
                        </span>
                        <button className="bg-technos hover:bg-technos/80 text-white rounded-full p-2 transition-colors">
                          <PlayCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl text-white mb-2">{episode.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{episode.description}</p>
                    <div className="flex justify-between items-center">
                      <button className="text-technos hover:text-technos/80 text-sm font-tech transition-colors flex items-center">
                        <Bookmark className="h-4 w-4 mr-1" />
                        AJOUTER
                      </button>
                      <span className="text-gray-500 text-xs">Diffusé le 12/06/2023</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-md font-display transition-colors">
                VOIR TOUS LES ÉPISODES
              </button>
            </div>
          </motion.div>
          
          {/* Voting Section */}
          <motion.div 
            className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-lg p-8 mb-24"
            variants={itemVariants}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl text-white mb-4">VOTEZ POUR LA PROCHAINE SAISON</h2>
              <p className="text-gray-300 mb-8">
                Participez à l'évolution de l'univers ACAB en votant pour les thèmes que vous souhaitez voir explorés dans la prochaine saison de la série animée.
              </p>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-white">Chargement des sondages...</div>
                </div>
              ) : polls.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400">Aucun sondage disponible pour le moment</div>
                </div>
              ) : (
                <div className="space-y-8">
                  {polls.map((poll: any) => {
                    const options = pollOptions[poll._id] || [];
                    const totalVotes = options.reduce((sum: number, opt: any) => sum + (opt.voteCount || 0), 0);
                    const status = userPollStatuses[poll._id];
                    const hasVoted = status?.hasVoted;
                    const hasChanged = status?.hasChanged;
                    const currentVote = status?.currentVote;
                    return (
                      <div key={poll._id} className="mb-8">
                        <h3 className="text-xl text-white mb-4">{poll.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {options.map((option: any) => {
                            const optionVotes = option.voteCount || 0;
                            const percentage = totalVotes > 0 ? Math.round(optionVotes / totalVotes * 100) : 0;
                            const isCurrentVote = currentVote === option._id;
                            return (
                              <div 
                                key={option._id}
                                className={`bg-black/20 p-4 rounded-lg hover:bg-black/30 transition-colors cursor-pointer border-2 ${
                                  selectedOption[poll._id] === option._id 
                                    ? 'border-blue-500' 
                                    : isCurrentVote ? 'border-green-500' : 'border-transparent'
                                }`}
                                onClick={() => (!hasVoted || (hasVoted && !hasChanged)) ? handleVote(poll._id, option._id) : null}
                                style={{ opacity: hasVoted && hasChanged && !isCurrentVote ? 0.5 : 1 }}
                              >
                                <h4 className="font-display text-white mb-2">
                                  {option.option}
                                  {isCurrentVote && " (Votre vote)"}
                                  {selectedOption[poll._id] === option._id && " ✓"}
                                </h4>
                                <p className="text-gray-400 text-sm mb-4">Option de vote</p>
                                <div className="mt-4 w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                                  <div className="bg-blue-500 h-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <div className="mt-1 text-right text-xs text-gray-400">{optionVotes} votes ({percentage}%)</div>
                              </div>
                            );
                          })}
                        </div>
                        <button 
                          onClick={() => submitVote(poll._id)}
                          disabled={
                            !user || !selectedOption[poll._id] || isSubmitting ||
                            (hasVoted && hasChanged)
                          }
                          className={`font-display px-6 py-3 rounded-md transition-colors ${
                            !user || !selectedOption[poll._id] || isSubmitting || (hasVoted && hasChanged)
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                              : hasVoted && !hasChanged
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {!user
                            ? 'CONNECTEZ-VOUS POUR VOTER'
                            : !selectedOption[poll._id]
                              ? 'SÉLECTIONNEZ UNE OPTION'
                              : isSubmitting
                                ? 'ENVOI...'
                                : hasVoted && !hasChanged
                                  ? 'CHANGER MON VOTE (1 seule fois)'
                                  : hasVoted && hasChanged
                                    ? 'VOTE DÉFINITIF'
                                    : 'SOUMETTRE MON VOTE'}
                        </button>
                        {hasVoted && hasChanged && (
                          <div className="text-green-400 text-sm mt-2">Votre vote est définitif pour ce sondage.</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              
              {!user && (
                <p className="text-orange-400 text-sm mt-4">Connectez-vous pour voter</p>
              )}
            </div>
          </motion.div>
          
          {/* Comics Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-8">
              <h2 className="font-display text-3xl text-white flex items-center">
                <Book className="mr-3 h-8 w-8 text-anciens" />
                BANDES DESSINÉES
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comics.map((comic, index) => (
                <motion.div 
                  key={comic.id}
                  className="flex bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-1/3">
                    <img 
                      src={comic.image} 
                      alt={comic.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <h3 className="font-display text-xl text-white mb-2">{comic.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{comic.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-500 text-xs block">Auteur: {comic.author}</span>
                        <span className="text-gray-500 text-xs block">{comic.pages} pages</span>
                      </div>
                      <button className="bg-anciens hover:bg-anciens/80 text-white px-4 py-2 rounded font-display text-sm transition-colors">
                        DÉCOUVRIR
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-md font-display transition-colors">
                EXPLORER LA COLLECTION COMPLÈTE
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legends;