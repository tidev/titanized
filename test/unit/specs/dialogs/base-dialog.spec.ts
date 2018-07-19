import { BaseDialog, DialogAction } from 'titanized/dialogs';

describe('BaseDialog', () => {
    const title = 'Title';
    const message = 'Some message';
    let dialog: BaseDialog = new BaseDialog(title, message);

    beforeEach(() => {
        dialog = new BaseDialog(title, message);
    });

    describe('constructor', () => {
        it('should set title and message', () => {
            expect(dialog.title).toEqual(title);
            expect(dialog.message).toEqual(message);
            const createOptions = (dialog as any)._createOptions;
            expect(createOptions.title).toEqual(title);
            expect(createOptions.message).toEqual(message);
        });
    });

    describe('getter/setter', () => {
        it('should set title and update property', () => {
            const newValue = 'Foo';
            const setPropertySpy = spyOn(dialog, 'setProperty');
            expect(dialog.title).toEqual(title);
            dialog.title = newValue;
            expect(setPropertySpy).toHaveBeenCalledWith('title', newValue);
        });

        it('should set message and update property', () => {
            const newValue = 'Bar';
            const setPropertySpy = spyOn(dialog, 'setProperty');
            expect(dialog.message).toEqual(message);
            dialog.message = newValue;
            expect(setPropertySpy).toHaveBeenCalledWith('message', newValue);
        });
    });

    describe('setProperty()', () => {
        it('should set property in create options', () => {
            const createOptions = (dialog as any)._createOptions;
            const newMessage = 'New message';
            expect(createOptions).toBeDefined();
            expect(createOptions.message).toEqual(message);
            dialog.setProperty('message', newMessage);
            expect(createOptions.message).toEqual(newMessage);
        });

        it('should set property on dialog proxy', () => {
            const proxy = (dialog as any).dialog;
            const newMessage = 'New message';
            expect(proxy.message).toEqual(message);
            dialog.setProperty('message', newMessage);
            expect(proxy.message).toEqual(newMessage);
        });
    });

    describe('addAction()', () => {
        it('should add default action', () => {
            const actionTitle = 'Custom';
            const action = new DialogAction(actionTitle);
            dialog.addAction(action);
            const proxy = (dialog as any).dialog as Titanium.UI.AlertDialog;
            expect(proxy.buttonNames.length).toEqual(1);
            expect(proxy.buttonNames[0]).toEqual(actionTitle);
        });

        it('should add cancelable action', () => {
            dialog.addAction(new DialogAction('Continue'));
            const cancelAction = new DialogAction('Cancel');
            cancelAction.cancel = true;
            dialog.addAction(cancelAction);
            const proxy = (dialog as any).dialog as Titanium.UI.AlertDialog;
            expect(proxy.cancel).toEqual(1);
        });

        it('should add destructive action', () => {
            dialog.addAction(new DialogAction('Continue'));
            const deleteAction = new DialogAction('Delete');
            deleteAction.destructive = true;
            dialog.addAction(deleteAction);
            const proxy = (dialog as any).dialog as Titanium.UI.AlertDialog;
            expect(proxy.destructive).toEqual(1);
        });
    });
});
