import { MentormatchPage } from './app.po';

describe('mentormatch App', () => {
  let page: MentormatchPage;

  beforeEach(() => {
    page = new MentormatchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
