import { DialogAction } from './DialogAction';
import { DialogInterface } from './DialogInterface';

export abstract class AbstractDialog implements DialogInterface {
    
    protected _actions: DialogAction[] = [];

    protected _buttonNames: string[] = [];

    get actions() {
        return this._actions;
    }

    set actions(actions: DialogAction[]) {
        this._actions = actions;
    }

    public addAction(action: DialogAction): void {
        this._actions.push(action);
        this._buttonNames.push(action.title);
    }

    public abstract show(): void;
}
