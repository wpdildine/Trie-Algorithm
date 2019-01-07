class Node {

    public children: object;
    public parent: Node;

    constructor(letter: string) {

        this.children = {};

    }
}

class Tree<T> {

    private root = new Node('');
    private exist = false;
    public continue = false;
    constructor() {}

    public insert(word) {
        this._insertNode(this.root, word);

    };

    private _insertNode(node, word) {

        if (word.charAt(0)) {

            let letter = word.charAt(0);
            let child = node.children[letter];
            if (!child) {
                child = new Node(letter);
                node.children[letter] = child;
            }

            this._insertNode(child, word.substring(1));

        }
    }
    public getWord(word){

        return this._getNode(this.root, word);

    }
    private _getNode(node, word){

            let letter = word.charAt(0);

            if (node.children[' ']){
                this.continue = true;
            }
            else {
                this.continue = false;
            }
            if(word.length === 0) {
                    return this.exist = true;
            }
            if(node.children.hasOwnProperty(letter)){
                this._getNode(node.children[letter], word.substring(1));
            }
            else {
                this.exist = false;
            }

            return this.exist;

    }

}

interface Table {

    Company:    any[];
    Names:      any[];
    Hits:       number;

}

export class ArticleParser<T> {

    public article: number;
    public wordCount: number;
    public companies: object;
    public tree: Tree<T>;
    public word: string;
    private text: string;

    constructor(dbList: string[], article: string) {

        this.article = article.match(/\n[.]/).index;
        this.wordCount = 0;
        this.word = null;
        this.companies = this.primaryNameParser(dbList);
        this.tree = null;
        this.text = null;
        this.Parser(dbList, article);

    }

    private Parser(dbList: string[], article) {

        this.tree = new Tree<T>();
        this.wordCount = 0;
        dbList.forEach((data)=>{
           data.forEach((name)=>{
               this.tree.insert(name);
           })
        });
        this.text = article.match(/\n[.]/).input.slice(0, article.match(/\n[.]/).index);
        this._parseText(this.text, this.tree);

    }

    private _parseText(text: string, tree: Tree<T>){

        let wLength = text.indexOf(' ');
        this.word = this._getNextWord();

        if(this.tree.getWord((this.word) && this.word) && !this.tree.continue){
            this._updateCount(this.word)
        }
        while (this.tree.continue){
            this.word = this.word + ' ' + this._getNextWord();
            if(this.tree.getWord((this.word) && this.word) && !this.tree.continue){
                this._updateCount(this.word)
            };
        }
        if (this.word.toLowerCase() !== 'a' && this.word.toLowerCase() !== 'an') {
            if ((this.word.toLowerCase() !== 'the' && this.word.toLowerCase() !== 'or') && this.word.toLowerCase() !=='but')
            this.wordCount++;
        }
        if (wLength != -1) {
            this._parseText(this.text, tree);
        }

    }

    private _getNextWord(){

        let wordlength = this.text.indexOf(' ');
        let word = this.text.slice(0, wordlength);
        if (word.match(/\n/)){
            word = word.slice(0, word.indexOf('\n'));
        }
        word = this._normalize(word);
        this.text = this.text.substring(word.length+1);
        return word;

    }
    private primaryNameParser(list){

        let cName = <any>[];
        for (let i = 0; i < list.length;i++){
            cName.push({Company: list[i][0], Names: list[i], Hits:0});
        }
        return cName;

    }
    private _normalize(text:string){

        return  text.replace(/[\n\t`~!@#$%^&*()_|+\-=?;:'"‘’,.<>\{\}\[\]\\\/]/gi, '');

    }

    private _updateCount(word){

        this.companies.forEach((company)=>{
           company.Names.forEach((name)=>{
                if (name === word){
                    company.Hits++;
                }
           });
        });
        
    }

}