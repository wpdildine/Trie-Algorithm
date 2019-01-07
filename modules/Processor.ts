export class Processor <T> {

    public table: object;

    constructor(input: string) {

        this.table = this.processData(input);

    }

    private processData (str: string){
        let nlines = /\n/;
        let tabs = /[ \t^/\s]/;
        let arr = str.split(nlines);
        let rArr = [];
        let fArr = [];
        let vArr = [];
        let tArr = [];
        arr.forEach(function (data){
            data = data.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"")
            rArr.push(data.split(tabs));
            rArr.forEach(function(data){
                tArr = [];
                let str = '';
                for (let i = 0; i < data.length; i++){
                    if (data[i] !== ''){
                        if (str.length > 0) {
                            str = str + ' ' + data[i];
                        }
                        else {
                            str = data[i];
                        }
                        if ((str.length > 0 && i < data.length) && data[i+1] !== ''){
                            if (data[i + 1] == undefined){
                                tArr.push(str);
                                str = '';
                            }
                        }
                    }
                    if (i !== data.length-1) {
                        if (str.length > 0 && data[i + 1].length == 0){
                            tArr.push(str)
                            str = ''
                        }
                    }
                }
            });
            vArr.push(tArr);
        });

        return vArr;

    }
    public getTable(){

        return this.table;

    }
}