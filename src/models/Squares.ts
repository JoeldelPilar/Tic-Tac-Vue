import { ref } from "vue";

export interface Square {
  id: number;
  mark: string;
  disabled: boolean;
}

export const squares = JSON.stringify([
  { id: 1, mark: '' , disabled: false},
  { id: 2, mark: '' , disabled: false},
  { id: 3, mark: '' , disabled: false},
  { id: 4, mark: '' , disabled: false},
  { id: 5, mark: '' , disabled: false},
  { id: 6, mark: '' , disabled: false},
  { id: 7, mark: '' , disabled: false},
  { id: 8, mark: '' , disabled: false},
  { id: 9, mark: '' , disabled: false},
]);
