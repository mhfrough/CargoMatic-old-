import { CargoMaticPage } from './app.po';

describe('cargo-matic App', () => {
  let page: CargoMaticPage;

  beforeEach(() => {
    page = new CargoMaticPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
