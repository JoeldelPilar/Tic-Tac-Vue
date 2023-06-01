import { ref } from "vue";

class Square {
  constructor(
    public id: number,
    public mark: string,
  ){}
}

export const board = ref<Square[]>([
  new Square(1, ''),
  new Square(2, ''),
  new Square(3, ''),
  new Square(4, ''),
  new Square(5, ''),
  new Square(6, ''),
  new Square(7, ''),
  new Square(8, ''),
  new Square(9, ''),
])