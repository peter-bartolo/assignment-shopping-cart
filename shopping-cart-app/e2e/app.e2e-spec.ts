import { ShoppingCartAppPage } from './app.po';

describe('shopping-cart-app App', () => {
  let page: ShoppingCartAppPage;

  beforeEach(() => {
    page = new ShoppingCartAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
