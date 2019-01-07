"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Processor_1 = require("./modules/Processor");
var Trie_1 = require("./modules/Trie");
var DataPresenter_1 = require("./modules/DataPresenter");
var initialize = function () {
    var readline = require("readline");
    var fs = require('fs');
    var events = require('events');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    function dataProcessor() {
        fs.readFile(process.cwd() + "/files/company.dat", "utf8", function (err, data) {
            var processor = new Processor_1.Processor(data);
            rl.question('Please enter name of the news article file.  Hit enter for Default Article.\n', function (answer) {
                if (answer === '') {
                    answer = 'article.txt';
                }
                articleProcessor(processor.getTable(), answer);
            });
        });
        function articleProcessor(table, answer) {
            fs.readFile(process.cwd() + "/files/" + answer, "utf8", function (err, data) {
                try {
                    output(data, table);
                    process.exit(0);
                }
                catch (_a) {
                    dataProcessor();
                }
            });
        }
    }
    ;
    function output(data, table) {
        var parser = new Trie_1.ArticleParser(table, data);
        var presenter = new DataPresenter_1.DataPresenter(parser);
        presenter.displayData();
    }
    dataProcessor();
};
initialize();
//# sourceMappingURL=index.js.map