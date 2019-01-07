"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataPresenter = /** @class */ (function () {
    function DataPresenter(data) {
        this.charCount = data.article;
        this.wordCount = data.wordCount;
        this.companies = data.companies;
    }
    ;
    DataPresenter.prototype.getCharCount = function () {
        return this.charCount;
    };
    ;
    DataPresenter.prototype.getWordCount = function () {
        return this.wordCount;
    };
    ;
    DataPresenter.prototype.getCompanyCount = function () {
        return this.companies;
    };
    ;
    DataPresenter.prototype.displayData = function () {
        var _this = this;
        console.log('COMPANY     | HIT COUNT  | RELEVENCE');
        console.log('-----------------------------------');
        var total = 0;
        this.companies.forEach(function (company) {
            var nLen = 12;
            var hLen = 6;
            total = total + company.Hits;
            hLen = hLen - company.Hits.toString().length;
            nLen = nLen - company.Company.length;
            console.log(company.Company + new Array(nLen + 1).join(' ') + '|' + "      " + company.Hits + new Array(hLen + 1).join(' ') + '|  ' + ((company.Hits / _this.getWordCount()) * 100).toFixed(4) + '%');
            console.log('-----------------------------------');
        });
        console.log('TOTAL       |      ' + total + '    |  ' + (total / this.getWordCount() * 100).toFixed(4) + '%');
        console.log('-----------------------------------');
        console.log('TOTAL WORDS |      ' + this.getWordCount() + '    ');
    };
    return DataPresenter;
}());
exports.DataPresenter = DataPresenter;
//# sourceMappingURL=DataPresenter.js.map