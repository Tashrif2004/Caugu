import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a few featured businesses for the hero section
    axios.get('/api/businesses?limit=4&subscriptionPlan=featured')
      .then(res => {
        setFeaturedBusinesses(res.data.businesses);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-blue-700 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Tafuta Fundi, Huduma au Biashara Popote Tanzania</h1>
          <p className="text-xl mb-8">Pata Wataalamu na Biashara za Kuaminika Tanzania. Fundi simu, mjenzi, dereva, daktari, na zaidi.</p>
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
            <input type="text" placeholder="Tafuta, e.g., Fundi Simu..." className="flex-grow p-3 rounded text-gray-800" />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-3 px-6 rounded">Tafuta</button>
          </div>
          <div className="flex justify-center space-x-8 mt-8 text-sm">
            <span><span className="font-bold">✓</span> Biashara Zilizothibitishwa</span>
            <span><span className="font-bold">✓</span> Tafuta kwa Dakika</span>
            <span><span className="font-bold">✓</span> Reviews za Kweli</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Wateja Wanasema Nini?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Static testimonial cards from your content */}
            <div className="bg-white p-6 rounded shadow">
              <p className="italic mb-2">“Nilihitaji fundi umeme kwa haraka... Huduma ilikuwa bora sana!”</p>
              <p className="font-bold">Grace Mwakyusa</p>
              <p className="text-sm text-gray-600">Mteja • Dar es Salaam</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <p className="italic mb-2">“Tangu niweke biashara yangu kwenye CAUGU, wateja wameongezeka zaidi ya asilimia 40.”</p>
              <p className="font-bold">John Mallya</p>
              <p className="text-sm text-gray-600">Mwenye Biashara • Arusha</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <p className="italic mb-2">“Nilitafuta mpiga picha wa harusi... mtaalamu aliyekuwa karibu na bei nzuri.”</p>
              <p className="font-bold">Amina Said</p>
              <p className="text-sm text-gray-600">Mteja • Mwanza</p>
            </div>
            <div className="bg-white p-6 rounded shadow flex items-center justify-center">
              <p className="text-gray-500">“Wateja wamepata mafundi ndani ya dakika chache.”</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Mfumo wa Bei</h2>
          <p className="text-center text-gray-600 mb-12">Chagua mpango unaofaa biashara yako. Anza bure au ongeza uonekano wako.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Bure</h3>
              <p className="text-gray-600 mb-4">Kwa biashara ndogo</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">0 Tsh<span className="text-base font-normal text-gray-500">/mwaka</span></p>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Orodheshwa kwenye directory</li>
                <li>✓ Maelezo muhimu ya biashara</li>
                <li>✓ Uwezekano wa kupokea simu</li>
                <li>✓ Listing moja</li>
              </ul>
              <button className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded">Anza Bure</button>
            </div>
            {/* Featured Plan */}
            <div className="border-2 border-yellow-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition relative">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">Maarufu Zaidi</span>
              <h3 className="text-2xl font-bold mb-2">Featured</h3>
              <p className="text-gray-600 mb-4">Onekane juu na upate wateja</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">20,000 Tsh<span className="text-base font-normal text-gray-500">/mwezi</span></p>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Onekane katika Featured Listings</li>
                <li>✓ Picha 10 za biashara</li>
                <li>✓ Mawasiliano ya moja kwa moja</li>
                <li>✓ Analytics za msingi</li>
                <li>✓ Support kwa barua pepe</li>
              </ul>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 rounded">Jisajili Sasa</button>
            </div>
            {/* Premium Plan */}
            <div className="border p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-gray-600 mb-4">Jukwaa kamili la kukuza</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">75,000 Tsh<span className="text-base font-normal text-gray-500">/mwezi</span></p>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Top ranking katika matokeo</li>
                <li>✓ Picha 25 za biashara</li>
                <li>✓ Verified Badge bila malipo</li>
                <li>✓ Analytics za kina</li>
                <li>✓ Priority support 24/7</li>
                <li>✓ Uwezekano wa matangazo</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">Wasiliana Nasi</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
