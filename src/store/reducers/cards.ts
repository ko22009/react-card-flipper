import { createSlice } from "@reduxjs/toolkit";

export interface ICard {
  index: number;
  value: string | number;
}

const initialState: {
  cards: ICard[];
  open_cards: Record<number, boolean>;
  active_card: number;
} = {
  cards: [],
  open_cards: {},
  active_card: -1,
};

const cardsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const {} = cardsSlice.actions;
export const cards = cardsSlice.reducer;
