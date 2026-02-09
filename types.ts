export interface Position {
  x: number;
  y: number;
}

export enum AppState {
  ASKING = 'ASKING',
  ACCEPTED = 'ACCEPTED'
}

export interface Memory {
  id: number;
  text: string;
  image: string;
  placeholderColor: string;
}