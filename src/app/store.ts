import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ContactSlice from '../features/contacts/ContactSlice';

export const store = configureStore({
  reducer: {
    contact: ContactSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
