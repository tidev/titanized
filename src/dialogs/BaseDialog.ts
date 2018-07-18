import { AbstractDialog } from './AbstractDialog';

// tslint:disable-next-line: ban-types
export type DialogProperties = NonNullable<{ [K in keyof Titanium.UI.AlertDialog]: Titanium.UI.AlertDialog[K] extends Function ? never : K }[keyof Titanium.UI.AlertDialog]>;

export class BaseDialog extends AbstractDialog {

    public title: string | undefined;

    public message: string | undefined;

    public createOptions: any = {};

    protected _dialog: Titanium.UI.AlertDialog | null = null;

    protected _initialized = false;

    constructor(title: string | undefined, message: string | undefined) {
        super();

        this.title = title;
        this.message = message;
    }

    private get dialog() {
        if (!this._dialog) {
            this._dialog = Ti.UI.createAlertDialog(this.createOptions);
            this._dialog.addEventListener('click', e => this.handleButtonClick(e));
            this._initialized = true;
        }

        return this._dialog;
    }

    public setProperty(propertyName: DialogProperties, propertyValue: any) {
        if (this._initialized) {
            this.dialog.applyProperties({ [propertyName]: propertyValue});
        } else {
            this.createOptions[propertyName] = propertyValue;
        }
    }

    public getProperty<T extends DialogProperties>(propertyName: T): Titanium.UI.AlertDialog[T] {
        return this.dialog[propertyName];
    }

    public show(): void {
        this._actions.forEach((action, index) => {
            if (action.isCancelAction) {
                this.dialog.cancel = index;
            }
            if (action.isDestructiveAction) {
                this.dialog.destructive = index;
            }
        });
        if (this._buttonNames.length > 0) {
            this.dialog.setButtonNames(this._buttonNames);
        }
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
