import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { supabase } from './lib/supabase';
import { toast } from 'sonner';
import { User, Moon, Sun, Settings as SettingsIcon, Save, Loader2, LogOut, ArrowLeft, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import UserMenu from './UserMenu';

export default function SettingsPage() {
  const { user, profile, setProfile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState('profile');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarUpload = async (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      setIsUploadingAvatar(true);
      const file = event.target.files[0];
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size must be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      if (data?.publicUrl) {
        setAvatarUrl(data.publicUrl);
        toast.success("Image uploaded! Don't forget to click 'Save Changes'.");
      }
    } catch (error) {
      toast.error(error.message || 'Error uploading image');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2 dark:text-white">Access Denied</h2>
        <p className="text-gray-500 dark:text-gray-400">Please sign in to view settings.</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">Go back home</Link>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Update auth
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName, avatar_url: avatarUrl }
      });
      if (error) throw error;
      
      // Force update local context immediately so UI updates instantly
      setProfile(prev => ({
        ...prev,
        full_name: fullName,
        avatar_url: avatarUrl
      }));

      // Update profiles table (ignore if it fails due to missing table/RLS)
      try {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      } catch (err) {
        console.warn("Could not update profiles table:", err);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans pb-32 transition-colors duration-1000 ${isDark ? 'bg-transparent text-white' : 'bg-gray-50 dark:bg-gray-900 text-black dark:text-white'}`}>
      
      {/* Navigation */}
      <nav className={`h-[80px] w-full px-8 md:px-16 flex items-center justify-between border-b sticky top-0 z-50 shadow-sm transition-colors duration-1000 ${isDark ? 'bg-black/20 border-white/10 text-white backdrop-blur-md' : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white'}`}>
        <Link to="/" className="text-2xl font-black tracking-[0.25em] uppercase hover:opacity-80 transition-opacity">Bizleap</Link>
        <div className="flex items-center gap-6">
          <UserMenu />
        </div>
      </nav>

      <main className="max-w-6xl w-full mx-auto px-4 pt-16 sm:px-6 lg:px-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white mb-8 transition-colors self-start">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black shadow-lg shadow-black/10">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Manage your account and preferences.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
                activeTab === 'profile' 
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10'
              }`}
            >
              <User className="w-5 h-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
                activeTab === 'preferences' 
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10'
              }`}
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Preferences
            </button>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all mt-4"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full min-h-[400px]">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2rem] p-8 shadow-sm backdrop-blur-xl"
              >
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-white/10">
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg overflow-hidden group">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()
                    )}
                    <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Camera className="w-6 h-6 text-white mb-1" />
                      <span className="text-[10px] text-white font-bold uppercase">Change</span>
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={isUploadingAvatar} />
                    </label>
                    {isUploadingAvatar && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{profile?.full_name || 'Anonymous User'}</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{user.email}</p>
                    <span className="inline-block px-3 py-1 bg-black/5 dark:bg-white/10 text-xs font-bold rounded-full mt-2">
                      User ID: {user.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="max-w-md space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full px-4 py-3.5 bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors rounded-xl font-bold text-sm">
                        {isUploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                        {isUploadingAvatar ? 'Uploading...' : 'Upload Image'}
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                          disabled={isUploadingAvatar}
                        />
                      </label>
                      {avatarUrl && (
                        <button type="button" onClick={() => setAvatarUrl('')} className="text-red-500 text-sm font-bold hover:underline">
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving || (fullName === (profile?.full_name || '') && avatarUrl === (profile?.avatar_url || ''))}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Changes
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2rem] p-8 shadow-sm backdrop-blur-xl"
              >
                <h2 className="text-xl font-bold mb-6">App Preferences</h2>

                <div className="max-w-md">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-full flex items-center justify-center shadow-sm">
                        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold">Theme Mode</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Switch between light and dark</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-white/20 transition-colors focus:outline-none"
                    >
                      <motion.div
                        layout
                        initial={false}
                        animate={{ x: theme === 'dark' ? 26 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 left-0 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
