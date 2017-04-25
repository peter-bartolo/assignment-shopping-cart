export class Product {
  private _id: number;
  private _name: string;
  private _ingredients: string;
  private _description: string;
  private _volume: number;
  private _price: number;
  private _image: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get ingredients(): string {
    return this._ingredients;
  }

  set ingredients(value: string) {
    this._ingredients = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get volume(): number {
    return this._volume;
  }

  set volume(value: number) {
    this._volume = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  public toJson() {
    return JSON.stringify({
      'id': this._id,
      'name': this._name,
      'ingredients': this._ingredients,
      'description': this._description,
      'volume': this._volume,
      'price': this._price,
      'image': this._image
    });
  }
}
