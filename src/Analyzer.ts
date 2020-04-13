import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { IAnalyzer } from './crowller'

interface ICourse {
  title: string[]
}

interface ICourseResult {
  time: number;
  data: string[];
}

interface IContent {
  [propname: number]: string[];
}


export default class Analyzer implements IAnalyzer {

  static instance: Analyzer;

  static getInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance
  }

  private getInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item');
    const infos: string[] = [];
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      infos.push(title);
    });
    const courseData: ICourseResult = {
      time: (new Date()).getTime(),
      data: infos
    }
    return courseData
  }

  private generateJsonContent(result: ICourseResult, filePath: string) {
    let fileContent: IContent = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[result.time] = result.data
    return fileContent;


  }


  public analyzer(html: string, filePath: string) {
    const courseInfo = this.getInfo(html)
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }

  private constructor() {

  }


}