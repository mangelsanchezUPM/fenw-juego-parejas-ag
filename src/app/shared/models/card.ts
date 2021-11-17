export class Card {
  private _value: number;
  private _image: string;
  private _shown: boolean;

  constructor(value: number) {
    this._value = value;
    this._image = this.getCardImage(this._value);
    this._shown = false;
  }

  get value(): number {
    return this._value;
  }
  get image(): string {
    return this.image;
  }
  get shown(): boolean {
    return this.shown;
  }
  getCardImage(value: number) {
    let cardsImgPath = '../../assets';
    switch (value) {
      case 1:
        cardsImgPath += 'bastos1';
        break;
      case 2:
        cardsImgPath += 'bastos12';
        break;
      case 3:
        cardsImgPath += 'copas1';
        break;
      case 4:
        cardsImgPath += 'copas12';
        break;
      case 5:
        cardsImgPath += 'espadas1';
        break;
      case 6:
        cardsImgPath += 'espadas12';
        break;
      case 7:
        cardsImgPath += 'oros1';
        break;
      case 8:
        cardsImgPath += 'oros12';
        break;
      default:
        cardsImgPath += 'reverso';
    }
    cardsImgPath += '.jpg';
    return cardsImgPath;
  }
}
