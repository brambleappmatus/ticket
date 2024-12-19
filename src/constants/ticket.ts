export const STAGES = ['OPEN', 'WAITING', 'CLOSED', 'ARCHIVED'] as const;
export const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'] as const;

export type Stage = typeof STAGES[number];
export type Priority = typeof PRIORITIES[number];