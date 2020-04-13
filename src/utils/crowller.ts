import superagent from 'superagent';
import fs from 'fs';
import path from 'path';


export interface IAnalyzer {
  analyzer: (html: string, filePath: string) => string;
}

class Crowller {

  private filePath = path.resolve(__dirname, '../../data/course.json');

  constructor(private analyzer: IAnalyzer, private url: string) {
    this.initSpiderProcess();
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const Html = await this.getRawHtml()
    const fileContent = this.analyzer.analyzer(Html, this.filePath)
    this.writeFile(fileContent);
  }

}

export default Crowller;