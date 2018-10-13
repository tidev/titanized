import { DialogAction } from './DialogAction';
import { DialogInterface } from './DialogInterface';

type MakeMutable<T> = { -readonly [P in keyof T]: T[P] };
// tslint:disable: ban-types
export type DialogPropertyNames = NonNullable<{ [K in keyof Titanium.UI.AlertDialog]: Titanium.UI.AlertDialog[K] extends Function ? never : K }[keyof Titanium.UI.AlertDialog]>;
export type DialogProperties = MakeMutable<Partial<Pick<Titanium.UI.AlertDialog, DialogPropertyNames>>>;
// tslint:enable: ban-types

export abstract class AbstractDialog implements DialogInterface {

    public static defaults: DialogProperties = {};

    protected _actions: DialogAction[] = [];

    protected _buttonNames: string[] = [];

    protected _initialized = false;

    get actions() {
        return this._actions;
    }

    set actions(actions: DialogAction[]) {
        this._actions = actions;
    }

    public addAction(action: DialogAction): void {
        if (this._initialized) {
            Ti.API.warn('Adding new actions to this dialog is disabled. You can only add actions before the internal dialog was initialized, e.g. before calling show().');
            return;
        }
        this._actions.push(action);
        this._buttonNames.push(action.title);
    }

    public abstract show(): void;
}
