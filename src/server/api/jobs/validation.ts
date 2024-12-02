import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(3).max(100),
  company: z.string().min(2).max(100),
  location: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().min(5).max(200),
  }),
  salary: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string().length(3),
  }),
  description: z.string().min(20).max(2000),
  requirements: z.array(z.string()).min(1),
  type: z.enum(['full-time', 'part-time', 'contract']),
});