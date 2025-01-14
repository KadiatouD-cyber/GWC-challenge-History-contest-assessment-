import React, { useState } from 'react';
import { 
  Leaf, TreePine, Droplets, Bus, Share2, Trophy, CheckCircle2, 
  Recycle, Lightbulb, Utensils, Plus, X, Edit2, Save
} from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof iconOptions;
  completed: boolean;
  streak: number;
  isCustom?: boolean;
}

const iconOptions = {
  Droplets: Droplets,
  TreePine: TreePine,
  Bus: Bus,
  Recycle: Recycle,
  Lightbulb: Lightbulb,
  Utensils: Utensils,
  Leaf: Leaf,
};

function App() {
  const [isAddingChallenge, setIsAddingChallenge] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof iconOptions>('Leaf');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Reduce Water Usage",
      description: "Take shorter showers and fix any leaking faucets",
      icon: "Droplets",
      completed: false,
      streak: 0
    },
    {
      id: 2,
      title: "Use Public Transport",
      description: "Choose public transportation over personal vehicle",
      icon: "Bus",
      completed: false,
      streak: 0
    },
    {
      id: 3,
      title: "Plant a Tree",
      description: "Contribute to local reforestation efforts",
      icon: "TreePine",
      completed: false,
      streak: 0
    },
    {
      id: 4,
      title: "Reduce Food Waste",
      description: "Plan meals and use leftovers creatively",
      icon: "Utensils",
      completed: false,
      streak: 0
    },
    {
      id: 5,
      title: "Energy Conservation",
      description: "Switch to LED bulbs and turn off unused lights",
      icon: "Lightbulb",
      completed: false,
      streak: 0
    },
    {
      id: 6,
      title: "Proper Recycling",
      description: "Sort waste and learn local recycling guidelines",
      icon: "Recycle",
      completed: false,
      streak: 0
    }
  ]);

  const toggleChallenge = (id: number) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id 
        ? { ...challenge, completed: !challenge.completed, streak: !challenge.completed ? challenge.streak + 1 : challenge.streak } 
        : challenge
    ));
  };

  const shareAchievements = () => {
    const completedChallenges = challenges.filter(c => c.completed).length;
    const text = `I've completed ${completedChallenges} green challenges today! 🌱 #GreenChallenge #Sustainability`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  };

  const addChallenge = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newChallenge: Challenge = {
      id: Math.max(...challenges.map(c => c.id)) + 1,
      title: newTitle,
      description: newDescription,
      icon: selectedIcon,
      completed: false,
      streak: 0,
      isCustom: true
    };

    setChallenges([...challenges, newChallenge]);
    resetForm();
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setSelectedIcon('Leaf');
    setIsAddingChallenge(false);
    setEditingId(null);
  };

  const startEdit = (challenge: Challenge) => {
    setEditingId(challenge.id);
    setNewTitle(challenge.title);
    setNewDescription(challenge.description);
    setSelectedIcon(challenge.icon);
  };

  const saveEdit = () => {
    if (!editingId || !newTitle.trim() || !newDescription.trim()) return;

    setChallenges(challenges.map(challenge =>
      challenge.id === editingId
        ? { ...challenge, title: newTitle, description: newDescription, icon: selectedIcon }
        : challenge
    ));
    resetForm();
  };

  const deleteChallenge = (id: number) => {
    setChallenges(challenges.filter(challenge => challenge.id !== id));
  };

  const totalCompleted = challenges.filter(c => c.completed).length;
  const totalStreaks = challenges.reduce((acc, curr) => acc + curr.streak, 0);

  const renderChallengeForm = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {editingId ? 'Edit Challenge' : 'Add New Challenge'}
        </h3>
        <button
          onClick={resetForm}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon
          </label>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(iconOptions).map(([key, Icon]) => (
              <button
                key={key}
                onClick={() => setSelectedIcon(key as keyof typeof iconOptions)}
                className={`p-2 rounded-lg ${
                  selectedIcon === key
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter challenge title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter challenge description"
            rows={3}
          />
        </div>
        <button
          onClick={editingId ? saveEdit : addChallenge}
          className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          {editingId ? 'Save Changes' : 'Add Challenge'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Leaf className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">Green Challenge Tracker</h1>
          <p className="text-lg text-green-700">Track your journey towards a sustainable lifestyle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-green-800">{totalCompleted}</span>
            </div>
            <p className="text-green-600">Challenges Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <span className="text-3xl font-bold text-green-800">{totalStreaks}</span>
            </div>
            <p className="text-green-600">Total Streak Days</p>
          </div>
        </div>

        {(isAddingChallenge || editingId !== null) && renderChallengeForm()}

        {!isAddingChallenge && editingId === null && (
          <button
            onClick={() => setIsAddingChallenge(true)}
            className="w-full mb-6 px-4 py-3 bg-white text-green-600 font-medium rounded-xl shadow-lg hover:bg-green-50 transition-colors duration-200 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Custom Challenge
          </button>
        )}

        <div className="space-y-4">
          {challenges.map(challenge => (
            <div 
              key={challenge.id}
              className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
                challenge.completed ? 'border-l-4 border-green-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {React.createElement(iconOptions[challenge.icon], {
                    className: "w-6 h-6 text-green-600"
                  })}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
                    <p className="text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-green-600">
                    {challenge.streak} day streak
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleChallenge(challenge.id)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        challenge.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500'
                      }`}
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </button>
                    {challenge.isCustom && (
                      <>
                        <button
                          onClick={() => startEdit(challenge)}
                          className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-500"
                        >
                          <Edit2 className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => deleteChallenge(challenge.id)}
                          className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={shareAchievements}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Achievements
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;