import React from 'react';
import { GlobeAltIcon, BookOpenIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin, potatoes }) => {
  const features = [
    {
      name: 'Catalog Varieties',
      description: 'Explore a growing database of potato varieties from around the world.',
      icon: GlobeAltIcon,
    },
    {
      name: 'Share Your Knowledge',
      description: 'Contribute your own findings and help build the most comprehensive potato resource.',
      icon: BookOpenIcon,
    },
    {
      name: 'Find the Perfect Potato',
      description: 'Discover the ideal potato for any dish, from crispy fries to creamy mash.',
      icon: SparklesIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="relative bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="flex items-center space-x-2">
                <span className="sr-only">PotatoPedia</span>
                <img className="h-8 w-auto sm:h-10" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f954.png" alt="Potato Emoji" />
                <span className="text-xl font-bold text-gray-800">PotatoPedia</span>
              </a>
            </div>
            <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
              <button
                onClick={onLogin}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in / Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-50" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Potatoes"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Discover the World of Potatoes</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Your ultimate guide to every potato variety. From the common Russet to the exotic Vitelotte, explore, learn, and contribute.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid">
                    <button
                      onClick={onLogin}
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-indigo-50 sm:px-8"
                    >
                      Get started
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900">A Resource Built for Potato Enthusiasts</h2>
              <div className="mt-12 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                {features.map((feature) => (
                  <div key={feature.name} className="group relative">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-5">
                      <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Potatoes Grid */}
        <div className="bg-white py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900">Recently Added Varieties</h2>
              <div className="mt-12 grid gap-8 lg:grid-cols-3">
                {potatoes.slice(0, 6).map((potato) => (
                  <div key={potato.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <img src={potato.image?.thumbnail?.url || 'https://placehold.co/400x300/e2e8f0/64748b?text=Potato'} alt={potato.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900">{potato.name}</h3>
                      <p className="mt-2 text-gray-600 line-clamp-3">{potato.description}</p>
                      <div className="mt-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                          Best for: {potato.bestFor}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {potatoes.length === 0 && <p className='text-gray-500 col-span-3'>No potato varieties have been added yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} PotatoPedia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
