import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import '../css/Profile.css';
import { getProfile, updateProfile } from '../services/user.service';

interface UserProfile {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile>({});
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setError('');
      try {
        const data = await getProfile();
        setProfile(data);
        setName(data?.name || '');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          return;
        }
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const updated = await updateProfile({ name });
      setProfile(updated);
      setMessage('Profile updated');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      setError('Failed to update profile');
    }
  };

  return (
    <div className="profile-container">
      <p>Profile</p>
      <p>Email: {profile.email || '-'}</p>
      <p>Role: {profile.role || '-'}</p>
      <form onSubmit={handleUpdate}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Profile;
