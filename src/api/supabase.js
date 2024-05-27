/**
 * Supabase API Wrapper
 * This file contains React hooks to interact with Supabase.
 * It handles loading and error states, and keeps the code DRY by extracting repeating code into helpers.
 * 
 * Based on the provided openapi.json, the following types and relations are documented:
 * 
 * Table: events
 * Columns:
 * - id: bigint (Primary Key)
 * - created_at: timestamp with time zone
 * - name: text
 * - date: date
 * - description: text
 */

import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to handle Supabase queries
const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

// React Query hooks

// Fetch all events
export const useEvents = () => useQuery({
  queryKey: ['events'],
  queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

// Add a new event
export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

// Update an event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

// Delete an event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => fromSupabase(supabase.from('events').delete().eq('id', eventId)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};