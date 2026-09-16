import { makeState } from './estate';
import type { ApiError, LocalError } from '>/lib/shared/types';
import type { DialogState, DialogStore } from '>/lib/client/types';

const initialState: DialogStore = {
  dialog: null,
  response: null,
};

const baseStore = makeState<DialogStore>(() => ({ ...initialState }));
const { get, setAuto } = baseStore;

export type DialogStoreActions = {
  openDialog: (dialog: DialogState) => void;
  closeDialog: () => void;
  getActive: () => DialogState | null;
  setError: (response: ApiError | LocalError | null) => void;
  getError: () => ApiError | LocalError | null;
  clearError: () => void;
};

export const dialogStoreActions: DialogStoreActions = {
  openDialog: (dialog) => {
    // setAuto({ dialog, response: null });
    setAuto({ dialog });
  },
  closeDialog: () => {
    setAuto({ dialog: null, response: null });
  },
  getActive: () => get().dialog,
  getError: () => get().response,
  setError: (response) => {
    setAuto({ response });
  },
  clearError: () => setAuto({ response: null }),
};

type DialogProps = {
  state: DialogStore;
  api: typeof dialogStoreActions;
};

export const useDialogStore = <TSelected = DialogProps>(
  selector?: (props: DialogProps) => TSelected,
): TSelected => {
  const state = baseStore();
  const api = dialogStoreActions;

  return selector ? selector({ state, api }) : ({ state, api } as TSelected);
};
