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
 * Fetches all events from the Supabase database.
 * @returns {Array} - An array of event objects.
 */
export const useEvents = () => useQuery({
  queryKey: ['events'],
  queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

/**
 * Adds a new event to the Supabase database.
 * @param {Object} newEvent - The new event object to be added.
 * @returns {Object} - The added event object.
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

/**
 * Deletes an event from the Supabase database.
 * @param {number} eventId - The ID of the event to be deleted.
 * @returns {void}
 */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => fromSupabase(supabase.from('events').delete().eq('id', eventId)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

/**
 * Updates an event in the Supabase database.
 * @param {Object} updatedEvent - The updated event object.
 * @returns {Object} - The updated event object.
 */
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};