import { Domaine } from './domaine.model';


export interface Module {
  id: string;
  name: string;
  description: string;
  domaineId: string;
  domaine?: Domaine;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: number; // in hours
  prerequisites?: string[];
  isActive: boolean;
  createdAt: Date;
}