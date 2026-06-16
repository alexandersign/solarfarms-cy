/**
 * Daily call targets per CRM user.
 * Edit the number next to a user's email to change their target.
 */
export const DAILY_CALL_TARGETS: Record<string, number> = {
  'alexander.papacosta@lighthief.com': 15,
  'zinovia@lighthief.com': 20,
  'costas@lighthief.com': 10,
  'office@lighthief.com': 10,  // Andreas Christoforou
}

export function getDailyCallTarget(email: string): number {
  return DAILY_CALL_TARGETS[email] ?? 10
}
