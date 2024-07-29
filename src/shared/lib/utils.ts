import { Database } from '@/shared/types/supabase'

/**
 * Generates a random 6-character invite code consisting of uppercase letters and digits.
 *
 * @returns {string} - The generated invite code.
 */
export function RGICode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('')
}

/**
 * Randomly selects one of the two voting sides: 'attachers' or 'defenders'.
 *
 * @returns {Database['public']['Enums']['voting_sides']} - The randomly selected voting side.
 */
export function RSVotingSide(): Database['public']['Enums']['voting_sides'] {
  return Math.random() < 0.5 ? 'attachers' : 'defenders'
}
