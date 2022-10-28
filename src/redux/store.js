import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';
// import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
// setupListeners(store.dispatch)

// setupListeners(): 서비스 내에서 사용자의 행동이나 요소의 변화 등을 지켜보다가
// 요청을 보낼 수 있도록 listener 를 준비해놓기 위한 함수
