export class Cart {
  private _id: number;
  private _userId: number;
  private _total: number;
  private _convertedToOrder: number;
  private _items: Item[];

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

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get convertedToOrder(): number {
    return this._convertedToOrder;
  }

  set convertedToOrder(value: number) {
    this._convertedToOrder = value;
  }

  get items(): Item[] {
    return this._items;
  }

  set items(value: Item[]) {
    this._items = value;
  }

  public toJson() {
    return JSON.stringify({
      'id': this._id,
      'userId': this._userId,
      'total': this._total,
      'convertedToOrder': this._convertedToOrder,
      'items': this._items
    });
  }
}

export class Item {
  private _id: number;
  private _qty: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get qty(): number {
    return this._qty;
  }

  set qty(value: number) {
    this._qty = value;
  }

  // toJson() {
  //   return JSON.stringify({
  //       'id': this._id,
  //       'qty': this._qty
  //     }
  //   );
  // }
}
