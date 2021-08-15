import { createSlice } from "@reduxjs/toolkit";
import generateRange from "@/utils/generateRange";
import { RootState } from "@/store/reducers";

export interface ICard {
  index: number;
  value: string | number;
}

const initialState: {
  cards: ICard[];
  open_cards: Record<number, boolean>;
  active_card: number;
  preload: boolean;
} = {
  cards: generateRange(1, 36),
  open_cards: {},
  active_card: -1,
  preload: false,
};

const cardsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    cardsGenerate: function (state, action) {
      return {
        ...state,
        cards: action.payload,
        open_cards: {},
        active_card: -1,
        preload: true,
      };
    },
    cardsPlay: function (state) {
      return {
        ...state,
        preload: false,
        open_cards: {},
        active_card: -1,
      };
    },
    cardsMatch: function (state, action) {
      return {
        ...state,
        open_cards: {
          ...state.open_cards,
          [action.payload]: true,
          [state.active_card]: true,
        },
        active_card: -1,
      };
    },
    cardsFlip: function (state, action) {
      return {
        ...state,
      };
    },
    cardsFlipAfter: function (state, action) {
      return {
        ...state,
        active_card: action.payload,
      };
    },
  },
});

export const getCards = (state: RootState) => state.cards.cards;
export const getActiveCard = (state: RootState) => state.cards.active_card;
export const {
  cardsGenerate,
  cardsPlay,
  cardsFlip,
  cardsMatch,
  cardsFlipAfter,
} = cardsSlice.actions;
export const cards = cardsSlice.reducer;
