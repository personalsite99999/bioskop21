export interface Movie {
  id: string;
  title: string;
  synopsis: string;
  driveUrl: string;
  year: string;
  rating: string;
  actors: string;
  posterUrl?: string;
  genre: 'Action' | 'Horor' | 'Komedi' | 'Drama' | 'Sci-Fi' | 'Thriller';
}