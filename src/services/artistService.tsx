import type { Artist } from '../interfaces/Artist';
import axiosClient from './axiosClient';

export const listArtists = async (): Promise<Artist[]> => {
  const response = await axiosClient.get<Artist[]>('/artist/get?quantity=10');
  console.log(response.data);

  return response.data;
};

export const createArtist = async (artistData: Omit<Artist, 'id'>): Promise<Artist> => {
  const response = await axiosClient.post<Artist>('/artist/create', artistData);
  return response.data;
};