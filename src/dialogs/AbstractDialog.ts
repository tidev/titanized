import { DialogAction } from './DialogAction';
import { DialogInterface } from './DialogInterface';

export abstract class AbstractDialog implements DialogInterface {

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
