import {ActionReducer, Action} from '@ngrx/store';
import {APP_SENTENCE_CHANGED, AppSentenceChangedPayload} from './app-actions';
import {SentenceState, Word} from './app-types';

const defaultState: SentenceState = {
    sentence: '',
    words: []
};

const isVowel = (c: string): boolean =>
    ['a', 'e', 'i', 'o', 'u'].some(s => s === c);

export const sentenceReducer: ActionReducer<SentenceState> = (state: SentenceState = defaultState, action: Action) => {

    switch (action.type) {
        case APP_SENTENCE_CHANGED: {
            let payload : AppSentenceChangedPayload = action.payload;
            let sentence = payload.sentence || '';
            let words = sentence.split(' ').filter(f => !!f);
            let hash = words.map<Word>(word => {
                let vocals = word.split('').filter(isVowel).length;
                let consonants = word.split('').filter(f => !isVowel(f)).length;
                return {
                    word,
                    count : { vocals, consonants }
                }
            });
            return {
                sentence: state.sentence,
                words : hash
            };
        }
        default:
            return state;
    }
};

