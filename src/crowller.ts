
import superagent from 'superagent';
import cheerio from 'cheerio';

class Crowller {
  private secret = 'x3b174jsx'
  private url = `http://www.dell-lee.com/typescript/demo.html?secet=${this.secret}`

  getInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item');
    const infos: string[] = [];
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      infos.push(title);
    });
    const currentTime = {
      time: (new Date()).getTime(),
      data: infos
    }
    console.log(currentTime);
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  async initSpiderProcess() {
    const Html = await this.getRawHtml()
    this.getInfo(Html);
  }


  constructor() {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller()