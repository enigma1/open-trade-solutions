import cloneDeep from 'lodash-es/cloneDeep';
import { makeFactoryState } from './estate';
import { defaultUserPrefs } from '>/lib/shared/config';
import type { UserPrefs } from '>/lib/shared/contracts';

type ConfigStoreState = UserPrefs;

export type ConfigStoreActions = {
  setTheme: (value?: string) => void;
  getPreferences: () => ConfigStoreState;
  savePreferences: (prefs?: Partial<ConfigStoreState>) => void;
  hydratePreferences: (prefs: Partial<ConfigStoreState>) => void;
};

export type ConfigStore = {
  useConfigStore: <
    TSelected = {
      state: ConfigStoreState;
      api: ConfigStoreActions;
    },
  >(
    selector?: (args: {
      state: ConfigStoreState;
      api: ConfigStoreActions;
    }) => TSelected,
  ) => TSelected;

  get: () => ConfigStoreState;
  api: ConfigStoreActions;
};

export const createConfigStore = (): ConfigStore => {
  const baseStore = makeFactoryState<ConfigStoreState>(() =>
    // cloneDeep(userPrefs),
    cloneDeep(defaultUserPrefs),
  )();

  const { get, setAuto } = baseStore;

  const api: ConfigStoreActions = {
    setTheme: (value) => {
      const theme = value ?? get().theme;
      document.documentElement.setAttribute('data-theme', theme);
      setAuto({ theme });
    },

    getPreferences: () => {
      return get();
    },

    savePreferences: (prefs) => {
      const settings = prefs ?? get();
      setAuto({ ...settings });
    },
    hydratePreferences: (prefs) => {
      setAuto({
        ...get(),
        ...prefs,
      });
    },
  };

  type SelectorProps = {
    state: ConfigStoreState;
    api: ConfigStoreActions;
  };

  const useConfigStore = <TSelected = SelectorProps>(
    selector?: (args: SelectorProps) => TSelected,
  ): TSelected => {
    const state = baseStore();

    const store = {
      state,
      api,
    };

    return selector ? selector(store) : (store as TSelected);
  };

  return {
    useConfigStore,
    get,
    api,
  };
};
