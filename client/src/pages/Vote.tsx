import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Vote as VoteIcon, Users, TrendingUp } from "lucide-react";

const Vote = () => {
  const [user, setUser] = useState<any>(null);
  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch polls from API
  const fetchPolls = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/polls');
      if (res.ok) {
        const data = await res.json();
        setPolls(data);
      } else {
        setPolls([]);
      }
    } catch (error) {
      setPolls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    fetchPolls();
  }, []);

  const handleVote = async (pollId: string, optionId: string) => {
    if (!user) {
      alert("Please login to vote!");
      window.location.href = '/login';
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ optionId })
      });

      if (res.ok) {
        const result = await res.json();
        fetchPolls(); // Refresh polls
        alert(result.message || "Vote submitted successfully!");
      } else {
        const error = await res.json();
        alert(error.message || "Failed to vote");
      }
    } catch (error) {
      console.error('Failed to vote:', error);
      alert("Failed to submit vote");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 pt-24 flex items-center justify-center">
        <div className="text-white">Loading polls...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Community Votes
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Shape the future of Kabila! Vote on important decisions and see what the community thinks.
          </p>
        </motion.div>

        {/* Polls */}
        <div className="space-y-8">
          {polls.length === 0 ? (
            <div className="text-center py-12">
              <VoteIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">No active polls at the moment</p>
              <p className="text-gray-500">Check back later for community votes!</p>
            </div>
          ) : (
            polls.map((poll: any, index: number) => (
              <motion.div
                key={poll._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{poll.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{poll.totalVotes || 0} votes</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>{poll.status || 'Active'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{poll.description}</p>

                <div className="space-y-4">
                  {poll.options?.map((option: any) => {
                    return (
                      <div key={option._id} className="relative">
                        <button
                          onClick={() => handleVote(poll._id, option._id)}
                          className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                            poll.userVoted
                              ? 'bg-gray-700/50 border-gray-600 hover:border-orange-500 hover:bg-gray-700/70'
                              : 'bg-gray-700/30 border-gray-600 hover:border-purple-500 hover:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{option.text}</span>
                            <span className="text-purple-400 font-bold">{option.votes || 0} votes</span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {poll.userVoted && (
                  <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-400 text-sm">✓ You have voted in this poll. Click any option to change your vote.</p>
                  </div>
                )}

                {!user && (
                  <div className="mt-4 p-3 bg-orange-900/30 border border-orange-500/30 rounded-lg">
                    <p className="text-orange-400 text-sm">Please login to participate in voting</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote;