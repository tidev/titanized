import { AbstractDialog } from './AbstractDialog';

// tslint:disable-next-line: ban-types
export type DialogProperties = NonNullable<{ [K in keyof Titanium.UI.AlertDialog]: Titanium.UI.AlertDialog[K] extends Function ? never : K }[keyof Titanium.UI.AlertDialog]>;

export class BaseDialog extends AbstractDialog {

    protected _title: string;

    protected _message: string;

    protected _createOptions: any = {};

    protected _dialog: Titanium.UI.AlertDialog | null = null;

    constructor(title: string, message: string) {
        super();

        this._title = title;
        this.setProperty('title', title);
        this._message = message;
        this.setProperty('message', message);
    }

    get title() {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
        this.setProperty('title', this._title);
    }

    get message() {
        return this._message;
    }

    set message(message: string) {
        this._message = message;
        this.setProperty('message', this._message);
    }

    private get dialog() {
        if (!this._dialog) {
            this._createOptions.title = this.title;
            this._createOptions.message = this.message;
            if (this._buttonNames.length > 0) {
                this._createOptions.buttonNames = this._buttonNames;
                this._actions.forEach((action, index) => {
                    if (action.isCancelAction) {
                        this._createOptions.cancel = index;
                    }
                    if (action.isDestructiveAction) {
                        this._createOptions.destructive = index;
                    }
                });
            }
            this._dialog = Ti.UI.createAlertDialog(this._createOptions);
            this._dialog.addEventListener('click', e => this.handleButtonClick(e));
            this._initialized = true;
        }

        return this._dialog;
    }

    public setProperty(propertyName: DialogProperties, propertyValue: any) {
        if (this._initialized) {
            this.dialog.applyProperties({ [propertyName]: propertyValue});
        } else {
            this._createOptions[propertyName] = propertyValue;
        }
    }

    public getProperty<T extends DialogProperties>(propertyName: T): Titanium.UI.AlertDialog[T] {
        return this.dialog[propertyName];
    }

    public show(): void {
        this.dialog.show();
    }

    private handleButtonClick(event: any) {
        if (this._actions.length === 0) {
            return;
        }

        const targetAction = this._actions[event.index];
        targetAction.handler(event);
    }
}
