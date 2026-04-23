import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    author: "Rahul Sharma",
    profilePic: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=random",
    time: "2 weeks ago",
    text: "Optimantix completely transformed our digital presence. As a manufacturing business, we didn't know SEO could bring international B2B leads. Traffic is up 150%!",
    rating: 5,
  },
  {
    id: 2,
    author: "Priya Gupta",
    profilePic: "https://ui-avatars.com/api/?name=Priya+Gupta&background=random",
    time: "1 month ago",
    text: "The web development team delivered an exceptional custom portal for our wholesale operations. Fast, scalable, and beautifully designed. Top tier service for growing MSMEs.",
    rating: 5,
  },
  {
    id: 3,
    author: "Amit Patel",
    profilePic: "https://ui-avatars.com/api/?name=Amit+Patel&background=random",
    time: "3 months ago",
    text: "We struggled with Amazon and Flipkart ads until we hired Optimantix. They lowered our ACoS to 12% and scaled our D2C brand sales across India.",
    rating: 5,
  },
  {
    id: 4,
    author: "Sanjay Kumar",
    profilePic: "https://ui-avatars.com/api/?name=Sanjay+Kumar&background=random",
    time: "1 month ago",
    text: "Very professional team. They listened to our requirements carefully and delivered Google Workspace migration with zero downtime. Highly recommended for traditional Indian businesses going digital.",
    rating: 5,
  },
  {
    id: 5,
    author: "Neha Verma",
    profilePic: "https://ui-avatars.com/api/?name=Neha+Verma&background=random",
    time: "2 months ago",
    text: "Our social media engagement tripled after partnering with them. Fantastic creative team that truly understands the local Indian market and audiences.",
    rating: 5,
  }
];

export const GoogleReviewsSlider: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 48 48" className="w-8 h-8">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571c.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            <h2 className="text-3xl font-bold dark:text-white">Customer Reviews</h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold dark:text-white mr-2">4.9</span>
            {[...Array(5)].map((_, i) => (
               <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-500 ml-2">(42 reviews)</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative flex overflow-x-hidden gap-6 pb-8 snap-x snap-mandatory">
          <motion.div
             drag="x"
             dragConstraints={{ right: 0, left: -600 }}
             className="flex gap-6 cursor-grab active:cursor-grabbing w-max hover:!cursor-grab"
           >
            {REVIEWS.map((review) => (
              <div 
                key={review.id} 
                className="w-[350px] md:w-[400px] flex-shrink-0 bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm snap-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={review.profilePic} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{review.author}</h3>
                    <p className="text-xs text-gray-500">{review.time}</p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-1 rounded-full border border-gray-100 dark:border-gray-700">
                      <svg viewBox="0 0 48 48" className="w-5 h-5">
                          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571c.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                      </svg>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
                  {review.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Swipe instructions for mobile */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-horizontal"><polyline points="18 8 22 12 18 16"/><polyline points="6 8 2 12 6 16"/><line x1="2" x2="22" y1="12" y2="12"/></svg>
            Swipe to view more
          </p>
        </div>
      </div>
    </section>
  );
};
