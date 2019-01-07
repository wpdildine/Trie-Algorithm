"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Processor = /** @class */ (function () {
    function Processor(input) {
        this.table = this.processData(input);
    }
    Processor.prototype.processData = function (str) {
        var nlines = /\n/;
        var tabs = /[ \t^/\s]/;
        var arr = str.split(nlines);
        var rArr = [];
        var fArr = [];
        var vArr = [];
        var tArr = [];
        arr.forEach(function (data) {
            data = data.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "");
            rArr.push(data.split(tabs));
            rArr.forEach(function (data) {
                tArr = [];
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i] !== '') {
                        if (str.length > 0) {
                            str = str + ' ' + data[i];
                        }
                        else {
                            str = data[i];
                        }
                        if ((str.length > 0 && i < data.length) && data[i + 1] !== '') {
                            if (data[i + 1] == undefined) {
                                tArr.push(str);
                                str = '';
                            }
                        }
                    }
                    if (i !== data.length - 1) {
                        if (str.length > 0 && data[i + 1].length == 0) {
                            tArr.push(str);
                            str = '';
                        }
                    }
                }
            });
            vArr.push(tArr);
        });
        return vArr;
    };
    Processor.prototype.getTable = function () {
        return this.table;
    };
    return Processor;
}());
exports.Processor = Processor;
//# sourceMappingURL=Processor.js.map