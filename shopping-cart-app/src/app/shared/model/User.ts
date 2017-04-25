export class User {
  private _id: number;
  private _name: string;
  private _surname: string;
  private _email: string;
  private _password: string;
  private _isLoggedIn: number;
  private _cartId: number;

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

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get isLoggedIn(): number {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: number) {
    this._isLoggedIn = value;
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
      'name': this._name,
      'surname': this._surname,
      'email': this._email,
      'password': this._password,
      'isLoggedIn': this._isLoggedIn,
      'cartId': this._cartId
    });
  }
}
