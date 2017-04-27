import {Item} from './Item';

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

  public updateCart(item: Item, itemPrice: number) {
    this._total += itemPrice * item.qty;
    if (this._hasItem(item.id)) {
      for (const cartItem of this._items) {
        if (cartItem.id === item.id) {
          cartItem.qty += item.qty;
        }
      }
    } else {
      this._items.push(item);
    }
  }

  private _hasItem(itemId: number) {
    if (this._items && this._items.length > 0) {
      for (const item of this._items) {
        if (item.id === itemId) {
          return true;
        }
      }
    }
    return false;
  }

  public toJson() {
    let itemJson = '[';
    if (this._items && this._items.length > 0) {
      let isFirstItem = true;
      for (const item of this._items) {
        if (!isFirstItem) {
          itemJson += ',';
        }
        const originalItem: Item = new Item();
        originalItem.id = item.id;
        originalItem.qty = item.qty;
        itemJson += originalItem.toJson();
        isFirstItem = false;
      }
    }
    itemJson += ']';

    return JSON.stringify({
      'id': this._id,
      'userId': this._userId,
      'total': this._total,
      'convertedToOrder': this._convertedToOrder,
      'items': JSON.parse(itemJson)
    });
  }
}
