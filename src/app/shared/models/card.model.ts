export class Card {
  value: number;
  shown: boolean;
  image: string;
  
  constructor(value: number, shown?: boolean) {
    this.value = value;
    this.image = this.getCardImage(this.value);
    this.shown = shown || false;
  }

  getCardImage(value: number) {
    let cardsImgPath = '../assets/naipes/';
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
