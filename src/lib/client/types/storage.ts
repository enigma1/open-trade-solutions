import type { UserPrefs } from '>/lib/shared/contracts';

export type ItemPreferenceProps = {
  modified: UserPrefs;
  onModify: (tempSettings: Partial<UserPrefs>) => void;
  triggerSave: number;
};
