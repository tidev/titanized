import { DialogAction } from './DialogAction';

export interface DialogInterface {
    addAction(action: DialogAction): void;
    show(options: any): void;
}
