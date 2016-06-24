export interface CharsCount {
    vocals: number;
    consonants: number;
}

export interface Word {
    word: string;
    count: CharsCount
};

export interface SentenceState {
    sentence: string;
    words : Word[];
};

export interface AppState {
    sentence: SentenceState
};