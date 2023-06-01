export class Square {
  constructor(
    public marker: string,
    public isUsed: boolean,
    public index: number,
  ){}
}

export class PlayedSquare {
  constructor(
    public marker: string,
    public id: number,
  ){}
}