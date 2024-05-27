import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './client';

/**
 * Helper function to handle Supabase queries.
 * @param {Promise} query - The Supabase query promise.
 * @returns {Promise} - The data from the query.
 * @throws {Error} - Throws an error if the query fails.
 */
const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/**
 * Hook to fetch events from Supabase.
 * @returns {Object} - The query object containing data, error, and status.
 */
export const useEvents = () => useQuery({
  queryKey: ['events'],
  queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

/**
 * Hook to add a new event to Supabase.
 * @returns {Object} - The mutation object containing mutate function and status.
 */
export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};