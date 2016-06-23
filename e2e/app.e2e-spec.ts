import { VocoPage } from './app.po';

describe('voco App', function() {
  let page: VocoPage;

  beforeEach(() => {
    page = new VocoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('voco works!');
  });
});
