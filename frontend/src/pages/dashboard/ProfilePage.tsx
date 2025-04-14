import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    avatar_url: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || '',
        email: user.email || '',
        avatar_url: '',
        bio: 'Product designer, photographer, and tech enthusiast.',
      });
    }
  }, [user]);

  const handleSave = async () => {
    // Update profile in Supabase
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          username: profile.username,
          bio: profile.bio,
        })
        .eq('id', user?.id)
        .select();

      if (error) throw error;

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{profile.username}</h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{profile.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  id="bio"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{profile.bio}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;