import { DialogPropertyNames } from './AbstractDialog';
import { BaseDialog } from './BaseDialog';
import { DialogAction } from './DialogAction';
import { PresetDialogInterface, PresetDialogOptions } from './PresetDialogInterface';

export abstract class AbstractPresetDialog<T> implements PresetDialogInterface {
    protected _dialog: BaseDialog;

    protected _okAction: DialogAction | null = null;

    protected _neutralAction: DialogAction | null = null;

    protected _cancelAction: DialogAction | null = null;

    constructor(options: PresetDialogOptions) {
        this._dialog = new BaseDialog(options.title, options.message);
    }

    public setProperty(propertyName: DialogPropertyNames, propertyValue: any) {
        this._dialog.setProperty(propertyName, propertyValue);
    }

    public getProperty<U extends DialogPropertyNames>(propertyName: U): Titanium.UI.AlertDialog[U] {
        return this._dialog.getProperty(propertyName);
    }

    public abstract show(): Promise<T>;

    protected initializeOkAction(buttonTitle: string) {
        this._okAction = new DialogAction(buttonTitle);
        this._dialog.addAction(this._okAction);
    }

    protected initializeNeutralAction(buttonTitle: string) {
        this._neutralAction = new DialogAction(buttonTitle);
        this._dialog.addAction(this._neutralAction);
    }

    protected initalizeCancelAction(buttonTitle: string) {
        this._cancelAction = new DialogAction(buttonTitle);
        this._cancelAction.cancel = true;
        this._dialog.addAction(this._cancelAction);
    }
}
