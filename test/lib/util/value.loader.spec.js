'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const AppEnv = require('archappenv').AppEnv;
const requireMock = require('mock-require');
const PathResolver = require('../../../dst/lib/util/path.resolver').PathResolver;
const ValueLoader = require('../../../dst/lib/util/value.loader').ValueLoader;

describe('value.loader.js tests', () => {
  describe('#resolveType()', () => {
    it('expect to resolve type as StringLoader', () => {
      // arranges
      const val = 'text-based value';

      // acts
      const result = ValueLoader.resolveType(val);

      // asserts
      expect(result).to.equal('StringLoader');
    });

    it('expect to resolve type as ModuleLoader', () => {
      // arranges
      const val1 = { type: 'type', module: 'module' };
      const val2 = { type: 'type', module: 'module', as: 'as' };
      const val3 = { type: 'type', module: 'module', as: 'as', extra: 'extra' };

      // acts
      const result1 = ValueLoader.resolveType(val1);
      const result2 = ValueLoader.resolveType(val2);
      const result3 = ValueLoader.resolveType(val3);

      // asserts
      expect(result1).to.equal('ModuleLoader');
      expect(result2).to.equal('ModuleLoader');
      expect(result3).to.equal('ModuleLoader');
    });

    it('expect to resolve type as PlainLoader', () => {
      // arranges
      const val1 = {};
      const val2 = { type: 'type' };
      const val3 = { module: 'module' };
      const val4 = { type: {}, module: 'module' };

      // acts
      const result1 = ValueLoader.resolveType(val1);
      const result2 = ValueLoader.resolveType(val2);
      const result3 = ValueLoader.resolveType(val3);
      const result4 = ValueLoader.resolveType(val4);

      // asserts
      expect(result1).to.equal('PlainLoader');
      expect(result2).to.equal('PlainLoader');
      expect(result3).to.equal('PlainLoader');
      expect(result4).to.equal('PlainLoader');
    });
  });

  describe('#dynamicLoad()', () => {
    it('expect to dynamic load from StringLoader', () => {
      // arranges
      const val = './test/resources/util';
      const absfile = PathResolver.absoluteFile(val);
      const expected = {
        file: absfile,
        module: { test: 'util' }
      };

      // acts
      const result = ValueLoader.dynamicLoad(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to dynamic load from ModuleLoader', () => {
      // arranges
      const val = { type: 'file', module: './test/resources/util' };
      const absfile = PathResolver.absoluteFile(val.module);
      const expected = {
        file: absfile,
        module: { test: 'util' }
      };

      // acts
      const result = ValueLoader.dynamicLoad(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to dynamic load from PlainLoader', () => {
      // arranges
      const val = { val: 'plain' };
      const expected = { val: 'plain' };

      // acts
      const result = ValueLoader.dynamicLoad(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#StringLoader()', () => {
    it('expect to load from string', () => {
      // arranges
      const base = AppEnv.Util.resolvePath('./test/resources');
      const val = './util/index.js';
      const absfile = path.join(base, val);
      const expected = {
        file: absfile,
        module: {
          test: 'util'
        }
      };

      // acts
      const result = ValueLoader.StringLoader(val, base);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#ModuleLoader() on file-type', () => {
    it('expect to load a file from module loader', () => {
      // arranges
      const absfile = path.join(AppEnv.Util.packagePath(), './test/resources/util/index.js');
      const val = { type: 'file', module: './test/resources/util/index.js' };
      const expected = {
        file: absfile,
        module: {
          test: 'util'
        }
      };

      // acts
      const result = ValueLoader.ModuleLoader(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load a file from module loader', () => {
      // arranges
      const absfile = path.join(AppEnv.Util.packagePath(), './test/resources/util/func.js');
      const val = { type: 'file', module: './test/resources/util/func.js' };

      // acts
      const act = ValueLoader.ModuleLoader(val).module;

      // asserts
      expect(typeof act).to.equal("function");
      expect(act.name).to.equal("TestFunction");
      expect(act()).to.equal(true);
    });
  });

  describe('#ModuleLoader() on module-type', () => {
    const extmodule = path.join(AppEnv.Util.packagePath(), './node_modules/extmodule');
    let statStub;

    before(() => {
      const extmodulepkg = path.join(extmodule, 'package.json');
      const extmodulemain = path.join(extmodule, './lib/index.js');
      requireMock(extmodulepkg, { main: './lib/index.js' });
      requireMock(extmodulemain, { test: 'util/value.loader' });
      statStub = sinon.stub(fs, 'statSync');
      statStub.callsFake(() => ({ isDirectory: () => false }));
    });

    after(() => {
      requireMock.stopAll();
      statStub.restore();
    });

    it('expect to load a module from module loader', () => {
      // arranges
      const val = { type: 'module', module: 'extmodule' };
      const absfileMock = path.join(AppEnv.Util.packagePath(), './node_modules/extmodule/lib/index.js');
      const expected = {
        file: absfileMock,
        module: {
          test: 'util/value.loader'
        }
      };

      // acts
      const result = ValueLoader.ModuleLoader(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#ModuleLoader() on invalid type', () => {
    it('expect to throw an error', () => {
      // arranges
      const val = { type: 'error' };

      // acts
      const act = () => ValueLoader.ModuleLoader(val);

      // asserts
      expect(act).to.throw(Error);
    });
  });

  describe('#PlainLoader()', () => {
    it('expect to load a plain object', () => {
      // arranges
      const val = { value: 'loader' };
      const expected = { value: 'loader' };

      // acts
      const result = ValueLoader.PlainLoader(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
