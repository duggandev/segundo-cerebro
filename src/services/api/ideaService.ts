/**
 * Servicio de Ideas
 * Encapsula todas las llamadas a API relacionadas con ideas
 */

import { apiCall, logApiCall } from './client';
import { ApiEntry, ApiResponse, CreateIdeaInput } from './types';

export const ideaService = {
  /**
   * Obtiene todas las ideas del usuario
   */
  async getAll(token: string, limit = 10, offset = 0): Promise<ApiEntry[]> {
    logApiCall('GET', `/entries?limit=${limit}&offset=${offset}`);

    const data = await apiCall<ApiResponse>(
      `/entries?limit=${limit}&offset=${offset}`,
      { token, method: 'GET' }
    );

    return data.entries || [];
  },

  /**
   * Obtiene una idea específica por ID
   */
  async getById(id: string, token: string): Promise<ApiEntry> {
    logApiCall('GET', `/entries/${id}`);

    const data = await apiCall<ApiResponse>(`/entries/${id}`, {
      token,
      method: 'GET',
    });

    if (!data.entry) {
      throw new Error('Entry not found');
    }

    return data.entry;
  },

  /**
   * Crea una nueva idea
   */
  async create(
    input: CreateIdeaInput,
    token: string
  ): Promise<ApiEntry> {
    logApiCall('POST', '/entries', input);

    const data = await apiCall<ApiResponse>('/entries', {
      token,
      method: 'POST',
      body: JSON.stringify(input),
    });

    const entry = (data as any).data || data.entry;

    if (!entry) {
      throw new Error('No entry returned from API');
    }

    return entry;
  },

  /**
   * Actualiza una idea existente
   */
  async update(
    id: string,
    updates: Partial<ApiEntry>,
    token: string
  ): Promise<ApiEntry> {
    logApiCall('PATCH', `/entries/${id}`, updates);

    const data = await apiCall<ApiResponse>(`/entries/${id}`, {
      token,
      method: 'PATCH',
      body: JSON.stringify(updates),
    });

    if (!data.entry) {
      throw new Error('No entry returned from API');
    }

    return data.entry;
  },

  /**
   * Elimina una idea
   */
  async delete(id: string, token: string): Promise<void> {
    logApiCall('DELETE', `/entries/${id}`);

    await apiCall(`/entries/${id}`, {
      token,
      method: 'DELETE',
    });
  },
};
