import type { Language } from '../context/LanguageContext';
import type { Product } from './products';

type Metadata = { title: string; summary: string };

export const productMetadata = {
  '/aris': {
    en: {
      title: 'Aris for Mac — Meeting assistant | Rhumb Labs',
      summary: 'Record meetings from the macOS menu bar, follow live transcripts, and generate meeting minutes. Aris processes meeting data on your Mac.',
    },
    es: {
      title: 'Aris para Mac — Asistente de reuniones | Rhumb Labs',
      summary: 'Graba reuniones desde la barra de menús de macOS, sigue la transcripción en vivo y genera actas. Aris procesa los datos de las reuniones en tu Mac.',
    },
  },
  '/pogo': {
    en: {
      title: 'Pogo — Climbing logbook | Rhumb Labs',
      summary: 'Log bouldering sessions, track your grades and attempts, and see your progress over time with Pogo.',
    },
    es: {
      title: 'Pogo — Bitácora de escalada | Rhumb Labs',
      summary: 'Registra tus sesiones de búlder, lleva un seguimiento de tus grados e intentos y consulta tu progreso con Pogo.',
    },
  },
  '/rhumbnav': {
    en: {
      title: 'RhumbNav — Flight planning and navigation | Rhumb Labs',
      summary: 'Plan flights, navigate VFR, and keep a digital pilot logbook with RhumbNav.',
    },
    es: {
      title: 'RhumbNav — Planificación de vuelo y navegación | Rhumb Labs',
      summary: 'Planifica vuelos, navega en VFR y lleva tu bitácora digital de piloto con RhumbNav.',
    },
  },
} satisfies Record<Product['route'], Record<Language, Metadata>>;
