import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Building2, DollarSign } from 'lucide-react';
import { Job } from '../types';

export default function JobForm() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    company: '',
    location: { address: '' },
    salary: { min: 0, max: 0, currency: 'USD' },
    description: '',
    requirements: [],
    type: 'full-time',
    syncStatus: 'pending'
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition(pos),
        (err) => console.error('Geolocation error:', err)
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      createdAt: new Date(),
      location: {
        ...formData.location,
        lat: position?.coords.latitude,
        lng: position?.coords.longitude,
      }
    };
    
    // TODO: Implement job storage logic
    console.log('Submitting job:', jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Job Title"
            className="flex-1 p-2 border rounded-lg"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Company Name"
            className="flex-1 p-2 border rounded-lg"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Address"
            className="flex-1 p-2 border rounded-lg"
            value={formData.location?.address}
            onChange={(e) => setFormData({ 
              ...formData, 
              location: { ...formData.location, address: e.target.value }
            })}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-500" />
          <div className="flex-1 grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min Salary"
              className="p-2 border rounded-lg"
              value={formData.salary?.min || ''}
              onChange={(e) => setFormData({
                ...formData,
                salary: { ...formData.salary!, min: Number(e.target.value) }
              })}
              required
            />
            <input
              type="number"
              placeholder="Max Salary"
              className="p-2 border rounded-lg"
              value={formData.salary?.max || ''}
              onChange={(e) => setFormData({
                ...formData,
                salary: { ...formData.salary!, max: Number(e.target.value) }
              })}
              required
            />
          </div>
        </div>

        <textarea
          placeholder="Job Description"
          className="w-full p-2 border rounded-lg h-32"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />

        <select
          className="w-full p-2 border rounded-lg"
          value={formData.type}
          onChange={(e) => setFormData({ 
            ...formData, 
            type: e.target.value as Job['type']
          })}
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Job Listing
      </button>
    </form>
  );
}