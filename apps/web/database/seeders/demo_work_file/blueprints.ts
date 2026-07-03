export const PERIOD_SETS = [
  [
    { name: "Semestre 1", startDate: "2025-09-01", endDate: "2026-01-23" },
    { name: "Semestre 2", startDate: "2026-01-26", endDate: "2026-07-04" },
  ],
  [
    { name: "Trimestre 1", startDate: "2025-09-01", endDate: "2025-11-28" },
    { name: "Trimestre 2", startDate: "2025-12-01", endDate: "2026-03-13" },
    { name: "Trimestre 3", startDate: "2026-03-16", endDate: "2026-07-04" },
  ],
]

export const LEVELS = [
  {
    name: "Sixième",
    shortCode: "6E",
    classes: ["6e A", "6e B"],
  },
  {
    name: "Cinquième",
    shortCode: "5E",
    classes: ["5e A", "5e B"],
  },
  {
    name: "Quatrième",
    shortCode: "4E",
    classes: ["4e A", "4e B"],
  },
]

export const THEMES = [
  { name: "Nombres et calculs", shortCode: "NUM", color: "#2563EB" },
  { name: "Géométrie", shortCode: "GEO", color: "#16A34A" },
  { name: "Grandeurs et mesures", shortCode: "MES", color: "#D97706" },
  { name: "Organisation de données", shortCode: "DON", color: "#7C3AED" },
]

export const ACTIVITY_TYPES = [
  { name: "Cours", color: "#2563EB" },
  { name: "Exercices", color: "#16A34A" },
  { name: "Évaluation", color: "#DC2626" },
  { name: "Remédiation", color: "#7C3AED" },
]

export const CHAPTERS = [
  { name: "Calcul numérique", shortCode: "CALC", themeIndex: 0 },
  { name: "Résolution de problèmes", shortCode: "PROB", themeIndex: 0 },
  { name: "Figures usuelles", shortCode: "FIG", themeIndex: 1 },
  { name: "Mesures et conversions", shortCode: "CONV", themeIndex: 2 },
  { name: "Méthodes transversales", shortCode: "METH", themeIndex: null },
]

export const ACTIVITY_TITLES = [
  "Découverte guidée",
  "Entraînement progressif",
  "Synthèse de méthode",
  "Défi d'application",
]

export const SLOT_TYPES = [
  { name: "Cours standard", color: "#0F766E" },
  { name: "Atelier", color: "#2563EB" },
  { name: "Devoir surveillé", color: "#DC2626" },
]

export const INTERRUPTION_TYPES = [
  { name: "Sortie pédagogique", color: "#EA580C" },
  { name: "Réunion institutionnelle", color: "#7C3AED" },
  { name: "Indisponibilité de salle", color: "#0F766E" },
]

export const TEMPLATE_SESSION_BLUEPRINTS = [
  { chapterShortCode: "CALC", title: "Installer les automatismes de calcul", durationMinutes: 55 },
  { chapterShortCode: "PROB", title: "Résoudre des problèmes en étapes", durationMinutes: 55 },
  { chapterShortCode: "FIG", title: "Construire et décrire des figures", durationMinutes: 55 },
  { chapterShortCode: null, title: "Réactivation et méthodes transversales", durationMinutes: 55 },
  { chapterShortCode: "CONV", title: null, durationMinutes: 55 },
]

export const RECURRING_SLOT_BLUEPRINTS = [
  { classShortCode: "6A", slotTypeIndex: 0, weekday: 2, startTime: "09:00", durationMinutes: 55 },
  { classShortCode: "6B", slotTypeIndex: 1, weekday: 4, startTime: "13:30", durationMinutes: 55 },
  { classShortCode: "5A", slotTypeIndex: 0, weekday: 1, startTime: "10:10", durationMinutes: 55 },
  { classShortCode: "5B", slotTypeIndex: 2, weekday: 5, startTime: "08:00", durationMinutes: 55 },
  { classShortCode: "4A", slotTypeIndex: 0, weekday: 3, startTime: "14:35", durationMinutes: 55 },
]

export const PLANNED_SESSION_OUTCOMES = [
  { outcome: "realized", reviewRequired: false, reviewed: true },
  { outcome: "shifted", reviewRequired: true, reviewed: false },
  { outcome: "partial", reviewRequired: true, reviewed: false },
  { outcome: "cancelled", reviewRequired: false, reviewed: true },
  { outcome: "to_catch_up", reviewRequired: true, reviewed: false },
]
