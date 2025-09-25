import React, { useState, useEffect, useCallback } from 'react';
import Manifest from '@mnfst/sdk';
import { ArrowUpOnSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import config from '../constants';

const DashboardPage = ({ user, onLogout }) => {
  const [myPotatoes, setMyPotatoes] = useState([]);
  const [newPotato, setNewPotato] = useState({ name: '', description: '', origin: '', color: '', bestFor: 'Boiling' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const manifest = new Manifest(config.APP_ID);

  const loadMyPotatoes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await manifest.from('potatoes').find({
        filter: { contributor: { id: user.id } },
        include: ['contributor'],
        sort: { createdAt: 'desc' }
      });
      setMyPotatoes(response.data);
    } catch (err) {
      console.error('Failed to load user potatoes:', err);
      setError('Could not load your potatoes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    if (user) {
      loadMyPotatoes();
    }
  }, [user, loadMyPotatoes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPotato({ ...newPotato, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleCreatePotato = async (e) => {
    e.preventDefault();
    setError('');
    if (!newPotato.name) {
      setError('Potato name is required.');
      return;
    }

    try {
      let imageData = {};
      if (imageFile) {
        const uploadedFile = await manifest.files.upload(imageFile);
        imageData = { image: uploadedFile };
      }
      
      const createdPotato = await manifest.from('potatoes').create({ ...newPotato, ...imageData, contributor: user.id });
      setMyPotatoes([createdPotato, ...myPotatoes]);
      setNewPotato({ name: '', description: '', origin: '', color: '', bestFor: 'Boiling' });
      setImageFile(null);
      document.getElementById('image-upload').value = null; // Reset file input
    } catch (err) {
      console.error('Failed to create potato:', err);
      setError(err.message || 'An error occurred while creating the potato.');
    }
  };

  const handleDeletePotato = async (potatoId) => {
    if (window.confirm('Are you sure you want to delete this potato?')) {
      try {
        await manifest.from('potatoes').delete(potatoId);
        setMyPotatoes(myPotatoes.filter(p => p.id !== potatoId));
      } catch (err) {
        console.error('Failed to delete potato:', err);
        setError('Failed to delete potato.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img className="h-8 w-auto" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f954.png" alt="Potato Emoji" />
              <span className="text-xl font-bold text-gray-800">PotatoPedia Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600 hidden sm:block">Welcome, {user.name}!</p>
              <a href="/admin" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 hover:text-gray-700">Admin Panel</a>
              <button onClick={onLogout} className="text-sm font-medium text-blue-600 hover:text-blue-800">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Create New Potato Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add a New Potato Variety</h2>
            <form onSubmit={handleCreatePotato} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value={newPotato.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-1">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin (e.g., Peru, Ireland)</label>
                <input type="text" name="origin" id="origin" value={newPotato.origin} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-1">
                 <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color (e.g., Brown, Red, Purple)</label>
                <input type="text" name="color" id="color" value={newPotato.color} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-1">
                <label htmlFor="bestFor" className="block text-sm font-medium text-gray-700">Best For</label>
                <select id="bestFor" name="bestFor" value={newPotato.bestFor} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option>Frying</option>
                  <option>Roasting</option>
                  <option>Boiling</option>
                  <option>Mashing</option>
                  <option>Salads</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" rows={3} value={newPotato.description} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <ArrowUpOnSquareIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                        <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Upload a file</span>
                            <input id="image-upload" name="image-upload" type="file" onChange={handleFileChange} className="sr-only" accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        {imageFile ? <p className="text-sm text-gray-500">{imageFile.name}</p> : <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>}
                    </div>
                </div>
              </div>
              {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
              <div className="md:col-span-2 text-right">
                <button type="submit" className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" /> Add Potato
                </button>
              </div>
            </form>
          </div>

          {/* My Potatoes List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Contributions</h2>
            {loading ? <p className="text-gray-500">Loading your potatoes...</p> :
            myPotatoes.length === 0 ? <p className="text-gray-500">You haven't added any potato varieties yet. Add one above!</p> :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPotatoes.map(potato => (
                <div key={potato.id} className="group relative border rounded-lg shadow-sm overflow-hidden">
                  <img src={potato.image?.thumbnail?.url || 'https://placehold.co/400x300/e2e8f0/64748b?text=Potato'} alt={potato.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{potato.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{potato.description}</p>
                     <div className="mt-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                          {potato.bestFor}
                        </span>
                      </div>
                  </div>
                  <div className="absolute top-2 right-2">
                     <button onClick={() => handleDeletePotato(potato.id)} className="p-1.5 bg-white/70 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <TrashIcon className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                     </button>
                  </div>
                </div>
              ))}
            </div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
