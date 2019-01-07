import { ArticleParser } from './Trie';

export class DataPresenter{

    public charCount: number;
    public wordCount: number
    public companies : object;

    constructor(data: ArticleParser){

        this.charCount = data.article;
        this.wordCount= data.wordCount;
        this.companies = data.companies;

    };

    public getCharCount(){

        return this.charCount;

    };

    public getWordCount(){

        return this.wordCount;

    };

    public getCompanyCount(){

        return this.companies;

    };

    public displayData(){

        console.log('COMPANY     | HIT COUNT  | RELEVENCE')
        console.log('-----------------------------------')
        let total = 0;
        this.companies.forEach((company)=>{
            let nLen = 12;
            let hLen = 6;
            total = total + company.Hits;
            hLen = hLen - company.Hits.toString().length;
            nLen = nLen - company.Company.length;
            console.log(company.Company + new Array(nLen + 1).join( ' ' ) + '|' + "      " + company.Hits + new Array(hLen + 1).join( ' ' ) + '|  ' + ((company.Hits/this.getWordCount())*100).toFixed(4) + '%')
            console.log('-----------------------------------')
        })
        console.log('TOTAL       |      ' + total + '    |  ' +  (total/this.getWordCount()*100).toFixed(4)+'%')
        console.log('-----------------------------------')
        console.log('TOTAL WORDS |      ' +this.getWordCount() + '    ')
    }

}