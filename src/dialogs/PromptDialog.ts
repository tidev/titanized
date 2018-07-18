import { device } from '../device';
import { AbstractPresetDialog } from './AbstractPresetDialog';
import { ConfirmDialogOptions, ConfirmResult } from './ConfirmDialog';

export enum PromptInputType {
    Password,
    Text
}

export interface PromptDialogOptions extends ConfirmDialogOptions {
    inputType?: PromptInputType;
    hintText?: string;
}

export interface PromptResult {
    confirm: ConfirmResult;
    value: string;
}

export class PromptDialog extends AbstractPresetDialog<PromptResult> {

    private _androidInput: Titanium.UI.TextField | null = null;

    constructor(options: PromptDialogOptions) {
        super(options);

        this.initializeOkAction(options.okButtonText ? options.okButtonText : 'Ok');
        if (options.neutralButtonText) {
            this.initializeNeutralAction(options.neutralButtonText);
        }
        this.initalizeCancelAction(options.cancelButtonText ? options.cancelButtonText : 'Cancel');

        if (device.runsIn('android')) {
            this.initializeAndroidPrompt(options);
        } else if (device.runsIn('ios')) {
            this.initializeIosPrompt(options);
        }
    }

    public show(): Promise<PromptResult> {
        return new Promise(resolve => {
            let value = '';
            if (device.runsIn('android')) {
                value = this._androidInput!.value;
            } else if (device.runsIn('ios')) {
                value = this._dialog.getProperty('value');
            }
            this._okAction!.handler = () => resolve({
                confirm: ConfirmResult.Ok,
                value
            });
            if (this._neutralAction !== null) {
                this._neutralAction.handler = () => resolve({
                    confirm: ConfirmResult.Neutral,
                    value
                });
            }
            this._cancelAction!.handler = () => resolve({
                confirm: ConfirmResult.Cancel,
                value
            });

            this._dialog.show();
        });
    }

    private initializeAndroidPrompt(options: PromptDialogOptions) {
        const inputType = options.inputType || PromptInputType.Text;
        const androidView = Ti.UI.createView();
        this._androidInput = Ti.UI.createTextField({
            passwordMask: inputType !== PromptInputType.Text
        });
        this._androidInput.hintText = options.hintText!;
        androidView.add(this._androidInput);
        this._dialog.setProperty('androidView', androidView);
    }

    private initializeIosPrompt(options: PromptDialogOptions) {
        const inputType: PromptInputType = options.inputType || PromptInputType.Text;
        if (inputType === PromptInputType.Text) {
            this._dialog.setProperty('style', Ti.UI.iOS.AlertDialogStyle.PLAIN_TEXT_INPUT);
        } else {
            this._dialog.setProperty('style', Ti.UI.iOS.AlertDialogStyle.SECURE_TEXT_INPUT);
        }
        this._dialog.setProperty('hintText', options.hintText);
    }
}
