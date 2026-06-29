import React, { useEffect, useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { toast } from 'sonner';

export function ReviewsSection({ templateId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();
  const { purchasedTemplates } = useCart();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const hasPurchased = purchasedTemplates.some(t => t.id === templateId);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('template_id', templateId)
        .order('created_at', { ascending: false });
        
      if (error) {
        // If the table doesn't exist yet, just ignore to avoid crashing UI before the user runs the SQL
        console.error("Error fetching reviews:", error.message);
        setReviews([]);
      } else {
        setReviews(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [templateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from('reviews').insert([
        {
          template_id: templateId,
          user_id: user.id,
          rating,
          comment,
          user_name: profile?.full_name || user?.email?.split('@')[0] || 'User',
          avatar_url: profile?.avatar_url
        }
      ]);

      if (error) throw error;
      
      toast.success("Review submitted successfully!");
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (err) {
      toast.error("Failed to submit review. Ensure the database table is created.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-8 md:px-16 mt-16 mb-24">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6" />
        <h2 className="text-3xl font-black tracking-tight">Customer Reviews</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-100 dark:bg-gray-900 rounded-2xl w-full"></div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review this template!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="p-6 bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                      {review.avatar_url ? (
                        <img src={review.avatar_url} alt={review.user_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-gray-500">{review.user_name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold">{review.user_name}</h4>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl sticky top-28">
            <h3 className="font-black text-xl mb-4">Write a Review</h3>
            {!user ? (
              <p className="text-gray-500 text-sm">Please log in to write a review.</p>
            ) : !hasPurchased ? (
              <p className="text-gray-500 text-sm">You must purchase this template before leaving a review.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 transition-transform hover:scale-110`}
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Comment</label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 outline-none focus:border-violet-500 transition-colors h-32 resize-none"
                    placeholder="What do you think about this template?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !comment.trim()}
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
