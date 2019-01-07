"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(letter) {
        this.children = {};
    }
    return Node;
}());
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = new Node('');
        this.exist = false;
        this.continue = false;
    }
    Tree.prototype.insert = function (word) {
        this._insertNode(this.root, word);
    };
    ;
    Tree.prototype._insertNode = function (node, word) {
        if (word.charAt(0)) {
            var letter = word.charAt(0);
            var child = node.children[letter];
            if (!child) {
                child = new Node(letter);
                node.children[letter] = child;
            }
            this._insertNode(child, word.substring(1));
        }
    };
    Tree.prototype.getWord = function (word) {
        return this._getNode(this.root, word);
    };
    Tree.prototype._getNode = function (node, word) {
        var letter = word.charAt(0);
        if (node.children[' ']) {
            this.continue = true;
        }
        else {
            this.continue = false;
        }
        if (word.length === 0) {
            return this.exist = true;
        }
        if (node.children.hasOwnProperty(letter)) {
            this._getNode(node.children[letter], word.substring(1));
        }
        else {
            this.exist = false;
        }
        return this.exist;
    };
    return Tree;
}());
var ArticleParser = /** @class */ (function () {
    function ArticleParser(dbList, article) {
        this.article = article.match(/\n[.]/).index;
        this.wordCount = 0;
        this.word = null;
        this.companies = this.primaryNameParser(dbList);
        this.tree = null;
        this.text = null;
        this.Parser(dbList, article);
    }
    ArticleParser.prototype.Parser = function (dbList, article) {
        var _this = this;
        this.tree = new Tree();
        this.wordCount = 0;
        dbList.forEach(function (data) {
            data.forEach(function (name) {
                _this.tree.insert(name);
            });
        });
        this.text = article.match(/\n[.]/).input.slice(0, article.match(/\n[.]/).index);
        this._parseText(this.text, this.tree);
    };
    ArticleParser.prototype._parseText = function (text, tree) {
        var wLength = text.indexOf(' ');
        this.word = this._getNextWord();
        if (this.tree.getWord((this.word) && this.word) && !this.tree.continue) {
            this._updateCount(this.word);
        }
        while (this.tree.continue) {
            this.word = this.word + ' ' + this._getNextWord();
            if (this.tree.getWord((this.word) && this.word) && !this.tree.continue) {
                this._updateCount(this.word);
            }
            ;
        }
        if (this.word.toLowerCase() !== 'a' && this.word.toLowerCase() !== 'an') {
            if ((this.word.toLowerCase() !== 'the' && this.word.toLowerCase() !== 'or') && this.word.toLowerCase() !== 'but')
                this.wordCount++;
        }
        if (wLength != -1) {
            this._parseText(this.text, tree);
        }
    };
    ArticleParser.prototype._getNextWord = function () {
        var wordlength = this.text.indexOf(' ');
        var word = this.text.slice(0, wordlength);
        if (word.match(/\n/)) {
            word = word.slice(0, word.indexOf('\n'));
        }
        word = this._normalize(word);
        this.text = this.text.substring(word.length + 1);
        return word;
    };
    ArticleParser.prototype.primaryNameParser = function (list) {
        var cName = [];
        for (var i = 0; i < list.length; i++) {
            cName.push({ Company: list[i][0], Names: list[i], Hits: 0 });
        }
        return cName;
    };
    ArticleParser.prototype._normalize = function (text) {
        return text.replace(/[\n\t`~!@#$%^&*()_|+\-=?;:'"‘’,.<>\{\}\[\]\\\/]/gi, '');
    };
    ArticleParser.prototype._updateCount = function (word) {
        this.companies.forEach(function (company) {
            company.Names.forEach(function (name) {
                if (name === word) {
                    company.Hits++;
                }
            });
        });
    };
    return ArticleParser;
}());
exports.ArticleParser = ArticleParser;
//# sourceMappingURL=Trie.js.map