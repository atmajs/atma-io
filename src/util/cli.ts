import { class_Dfr } from '../global'

export function cli_prompt(str, callback) {
    Factory.create(new PromptAction(str, callback));
};
export function cli_confirm(str, callback) {
    Factory.create(new ConfirmAction(str + ' (y): ', callback));
};

//= private
var rl,
    factory_: Factory;

function initialize() {

    const readline = require('readline');

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

class Factory {
    collection = []
    busy = false

    constructor () {
        this.process = this.process.bind(this);
        this.next = this.next.bind(this);
    }

    static create(prompt) {
        if (rl == null) {
            initialize();
            factory_ = new Factory;
        }

        factory_.collection.push(prompt);
        factory_.process();
    }

    private process() {
        if (this.busy)
            return;

        if (this.collection.length === 0)
            return;

        this.busy = true;
        this
            .collection
            .shift()
            .process()
            .always(this.next);
    }

    private next() {
        this.busy = false;
        this.process();
    }
}

class PromptAction extends class_Dfr {

    constructor(protected text: string = '>', protected callback: Function) {
        super();
    }
    process() {
        rl.resume();

        process.stdout.write('\n');
        rl.question(this.text, this.onInput.bind(this));
        return this;
    }
    onInput(answer: string) {
        rl.pause();
        this.callback && this.callback(answer);
        this.resolve(answer);
    }
}

class ConfirmAction extends PromptAction {
    constructor(text, callback) {
        super(text, callback);

        var original = this.callback;

        this.callback = function (answer) {
            original(/^y|yes$/ig.test(answer));
        };
    };

    onInput(answer) {
        if (!answer) {
            this.process();
            return;
        }
        super.onInput(answer);
    }
}
