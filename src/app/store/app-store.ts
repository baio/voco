import {provideStore, combineReducers} from "@ngrx/store";

import { sentenceReducer } from "./sentence-reducer";

export const appStore: any[] =  provideStore({
        sentence: sentenceReducer
});

export const APP_STORE_PROVIDERS: any[][] = [
    appStore
];