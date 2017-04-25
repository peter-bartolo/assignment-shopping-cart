export class Order {
  private _id: number;
  private _userId: number;
  private _cartId: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get cartId(): number {
    return this._cartId;
  }

  set cartId(value: number) {
    this._cartId = value;
  }

  public toJson() {
    return JSON.stringify({
      'id': this._id,
      'userId': this._userId,
      'cartId': this._cartId
    });
  }
}
