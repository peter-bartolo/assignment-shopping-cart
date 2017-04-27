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

  public toJson() {
    return JSON.stringify({
      'id': this._id,
      'qty': this._qty
    });
  }
}
