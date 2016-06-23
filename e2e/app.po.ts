export class VocoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('voco-root h1')).getText();
  }
}
