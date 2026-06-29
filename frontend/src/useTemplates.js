import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        
        const luxuryMockTemplates = [
          {
            id: 9001,
            title: 'Aura Luxury UI Kit',
            author: 'Bizleap Studio',
            price: 99,
            category: 'Figma',
            rating: 5,
            reviews: 124,
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
            description: 'A premium, high-end UI kit designed for luxury brands, real estate, and exclusive services.',
            tag: 'Bestseller',
            technologies: ['Figma', 'UI Kit'],
            features: ['100+ Premium Screens', 'Dark & Light Mode', 'Global Styleguide', 'Auto Layout v5']
          },
          {
            id: 9002,
            title: 'Velvet E-Commerce Kit',
            author: 'Premium Design',
            price: 79,
            category: 'UI Kit',
            rating: 4.9,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
            description: 'Elegant e-commerce screens tailored for fashion, jewelry, and high-end retail applications.',
            tag: 'New',
            technologies: ['Figma', 'Sketch', 'UI Kit'],
            features: ['Product Pages', 'Checkout Flows', 'High-Res Assets', 'Minimalist Design']
          },
          {
            id: 9003,
            title: 'Lumina Dashboard',
            author: 'Bizleap Studio',
            price: 129,
            category: 'Figma',
            rating: 5,
            reviews: 210,
            image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80',
            description: 'A sophisticated dark-mode dashboard UI kit for fintech, luxury analytics, and exclusive platforms.',
            tag: 'Featured',
            technologies: ['Figma', 'React', 'UI Kit'],
            features: ['70+ Widgets', 'Interactive Charts', 'Dark Theme Only', 'Component Library']
          }
        ];
        
        setTemplates([...(data || []), ...luxuryMockTemplates]);
      } catch (err) {
        console.error('Error fetching templates:', err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  return { templates, loading, error };
}
