import module = require("module");
import { Processor } from './modules/Processor';
import { ArticleParser } from './modules/Trie';
import { DataPresenter } from './modules/DataPresenter';


let initialize = function () {

    let readline = require("readline");
    let fs = require('fs');
    let events = require('events');
    let rl = readline.createInterface({

        input: process.stdin,
        output: process.stdout,
        terminal: false


    });

    function dataProcessor() {

        fs.readFile(process.cwd() + "/files/company.dat", "utf8", function (err, data) {
            let processor = new Processor(data);
            rl.question('Please enter name of the news article file.  Hit enter for Default Article.\n', (answer)=>{
                if (answer === ''){
                    answer = 'article.txt';
                }
                articleProcessor(processor.getTable(), answer);
            })

        });

        function articleProcessor (table, answer){

                fs.readFile(process.cwd() + "/files/" + answer, "utf8", function (err, data) {
                    try {
                        output(data, table);
                        process.exit(0)
                    }
                    catch{
                        dataProcessor();
                    }
                });
        }
    };

    function output(data, table){
        let parser = new ArticleParser(table, data);
        let presenter = new DataPresenter(parser);
        presenter.displayData();
    }
    dataProcessor();

};

initialize();



