'use babel';

import Px2rem from '../lib/index';

describe('Px2rem Plus', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('px2rem-plus');
    waitsForPromise(() => {
      return activationPromise;
    });

    waitsForPromise(() => {
      atom.workspace.open();
    });
  });

  it('converts', () => {
    let editor = atom.workspace.getActiveTextEditor();
    editor.setText('6px');
    let changeHandler = jasmine.createSpy('changeHandler');
    editor.onDidChange(changeHandler);
    atom.commands.dispatch(workspaceElement, 'px2rem-plus:convert');

    waitsForPromise(() => {
      return activationPromise;
    });

    waitsFor(() => {
      return changeHandler.callCount > 0;
    });

    return runs(() => {
      return expect(editor.getText()).toEqual('0.08rem');
    });
  });
});
