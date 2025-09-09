'use client'

import { useState } from 'react'
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Shield, 
  AlertTriangle, 
  Info, 
  X, 
  Play,
  Camera,
  Search,
  Home,
  Compass,
  User
} from 'lucide-react'

interface Post {
  id: string
  user: {
    username: string
    avatar: string
  }
  content: {
    type: 'image' | 'video'
    url: string
    caption: string
  }
  deepfakeInfo?: {
    level: 1 | 2
    confidence: number
    reasons: string[]
    isHarmful: boolean
  }
  likes: number
  comments: number
  timestamp: string
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      username: 'celebrity_fan_page',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    },
    content: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=600&fit=crop',
      caption: 'OMG Hugh Jackman just said he loves my fan art! 😍 #wolverine #hughjackman'
    },
    deepfakeInfo: {
      level: 1,
      confidence: 76,
      reasons: [
        'Facial inconsistencies detected around mouth area',
        'Voice pattern anomalies in audio track',
        'Lighting inconsistencies with background'
      ],
      isHarmful: false
    },
    likes: 1249,
    comments: 87,
    timestamp: '2h ago'
  },
  {
    id: '2',
    user: {
      username: 'political_insider',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    content: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&h=600&fit=crop',
      caption: 'BREAKING: Senator announces new policy changes affecting healthcare! Share this important message! 🚨'
    },
    deepfakeInfo: {
      level: 2,
      confidence: 89,
      reasons: [
        'High-impact political figure detected',
        'Claims about real-world policy actions',
        'Facial artifacts consistent with deepfake generation',
        'Call-to-action to share increases misinformation risk'
      ],
      isHarmful: true
    },
    likes: 542,
    comments: 156,
    timestamp: '4h ago'
  },
  {
    id: '3',
    user: {
      username: 'lifestyle_blogger',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b125b461?w=150&h=150&fit=crop&crop=face'
    },
    content: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=600&fit=crop',
      caption: 'Beautiful sunset from my vacation! 🌅 #nofilter #authentic'
    },
    likes: 892,
    comments: 23,
    timestamp: '6h ago'
  }
]

export default function HomePage() {
  const [posts] = useState<Post[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showEducation, setShowEducation] = useState(false)
  const [blockedContent, setBlockedContent] = useState<string | null>('2') // Auto-block the harmful post

  const handleDeepfakeClick = (post: Post) => {
    setSelectedPost(post)
    setShowEducation(true)
  }

  const handlePlayBlocked = (postId: string) => {
    setBlockedContent(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold instagram-gradient" style={{ 
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            DeepTrust Demo
          </h1>
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6" style={{ color: '#E4405F' }} />
            <Search className="w-6 h-6 text-gray-600" />
            <Heart className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Stories */}
      <div className="bg-white border-b border-gray-300 py-4">
        <div className="max-w-md mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex flex-col items-center gap-2" style={{ minWidth: '60px' }}>
                <div className="story-ring">
                  <div className="w-14 h-14 bg-white rounded-full" style={{ padding: '2px' }}>
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=60&h=60&fit=crop&crop=face`} 
                      alt={`Story ${i}`} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-600">user{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <main className="max-w-md mx-auto" style={{ paddingBottom: '80px' }}>
        {posts.map((post) => (
          <div key={post.id} className="post-container relative">
            {/* Post Header */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold text-sm">{post.user.username}</span>
              </div>
              <MoreHorizontal className="w-6 h-6 text-gray-600 cursor-pointer" />
            </div>

            {/* Post Content */}
            <div className="relative">
              {blockedContent === post.id && post.deepfakeInfo?.level === 2 ? (
                // Level 2: Freeze-frame interstitial
                <div className="aspect-square bg-black relative flex items-center justify-center">
                  <div className="text-center p-6 bg-white rounded-lg mx-4" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
                    <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">⚠ {post.deepfakeInfo.confidence}% likely deepfake</h3>
                    <p className="text-gray-600 mb-4">This content may spread misinformation</p>
                    <div className="flex gap-3 justify-center">
                      <button 
                        onClick={() => handlePlayBlocked(post.id)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Show Video
                      </button>
                      <button 
                        onClick={() => setBlockedContent(null)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Skip Video
                      </button>
                    </div>
                    <button 
                      onClick={() => handleDeepfakeClick(post)}
                      className="text-sm mt-3 underline"
                      style={{ color: '#E4405F' }}
                    >
                      See Why Detected + Educational Toolkit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-square relative">
                  <img 
                    src={post.content.url} 
                    alt="Post content"
                    className="w-full h-full object-cover"
                  />
                  {post.content.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black rounded-full p-3" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Level 1: Sliding subtitle warning */}
              {post.deepfakeInfo?.level === 1 && blockedContent !== post.id && (
                <div className="absolute bottom-0 left-0 right-0 deepfake-warning-level1">
                  <button 
                    onClick={() => handleDeepfakeClick(post)}
                    className="flex items-center gap-2 text-sm text-yellow-800 w-full text-left"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>⚠ Possible Deepfake — This content may not be authentic.</span>
                    <Info className="w-4 h-4" style={{ marginLeft: 'auto' }} />
                  </button>
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-500" />
                  <MessageCircle className="w-6 h-6 text-gray-600 cursor-pointer" />
                  <Send className="w-6 h-6 text-gray-600 cursor-pointer" />
                </div>
                <Bookmark className="w-6 h-6 text-gray-600 cursor-pointer" />
              </div>

              <div className="text-sm">
                <p className="font-semibold mb-1">{post.likes.toLocaleString()} likes</p>
                <p>
                  <span className="font-semibold">{post.user.username}</span>{' '}
                  {post.content.caption}
                </p>
                <p className="text-gray-500 mt-1">View all {post.comments} comments</p>
                <p className="text-gray-400 text-xs mt-1">{post.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Home className="w-6 h-6 text-gray-900" />
            <Search className="w-6 h-6 text-gray-500" />
            <Camera className="w-6 h-6 text-gray-500" />
            <Compass className="w-6 h-6 text-gray-500" />
            <User className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </nav>

      {/* Education Modal */}
      {showEducation && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-lg max-w-md w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="p-4 border-b border-gray-300 flex items-center justify-between">
              <h2 className="text-lg font-bold">Why This Was Flagged</h2>
              <button 
                onClick={() => setShowEducation(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  selectedPost.deepfakeInfo?.level === 2 ? 'bg-red-50' : 'bg-yellow-100'
                }`}>
                  {selectedPost.deepfakeInfo?.level === 2 ? 
                    <AlertTriangle className="w-6 h-6 text-red-600" /> : 
                    <Info className="w-6 h-6 text-yellow-800" />
                  }
                </div>
                <div>
                  <h3 className="font-semibold">
                    {selectedPost.deepfakeInfo?.confidence}% Confidence Score
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedPost.deepfakeInfo?.isHarmful ? 'Harmful/Misinformational' : 'Non-harmful/Troublesome'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Detection Signals:</h4>
                <ul className="space-y-2">
                  {selectedPost.deepfakeInfo?.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div 
                        className="rounded-full" 
                        style={{ 
                          width: '8px', 
                          height: '8px', 
                          backgroundColor: '#E4405F',
                          marginTop: '8px',
                          flexShrink: 0
                        }} 
                      />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2" style={{ color: '#1e40af' }}>🛡️ How to Protect Yourself:</h4>
                <ul className="text-sm space-y-1" style={{ color: '#1e40af' }}>
                  <li>• Always verify news from official sources</li>
                  <li>• Look for inconsistencies in facial features</li>
                  <li>• Be skeptical of sensational claims</li>
                  <li>• Check multiple news outlets before sharing</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2" style={{ color: '#166534' }}>📚 Learn More:</h4>
                <p className="text-sm mb-2" style={{ color: '#166534' }}>
                  Understanding deepfakes helps build digital literacy and protect against misinformation.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                  View Educational Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
