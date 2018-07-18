export type DialogActionHandler = (event?: any) => void;

export class DialogAction {
    public title: string = '';

    public handler: DialogActionHandler;

    private _cancel: boolean = false;

    private _destructive: boolean = false;

    constructor(title: string, handler?: DialogActionHandler) {
        this.title = title;
        this.handler = handler ? handler : () => undefined;
    }

    get isCancelAction() {
        return this._cancel;
    }

    set cancel(cancel: boolean) {
        this._cancel = cancel;
    }

    get isDestructiveAction(): boolean {
        return this._destructive;
    }

    set destructive(destructive: boolean) {
        this._destructive = destructive;
    }
}
