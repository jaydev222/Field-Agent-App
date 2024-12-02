import { Job } from '../types';

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function calculateLocationScore(job: Job, agentLocation: { lat: number; lng: number }): number {
  if (!job.location.lat || !job.location.lng) return 0.5;

  const distance = calculateDistance(
    job.location.lat,
    job.location.lng,
    agentLocation.lat,
    agentLocation.lng
  );

  // Score decreases as distance increases, max distance considered is 50km
  return Math.max(0, 1 - distance / 50);
}