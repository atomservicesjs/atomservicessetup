'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const AppEnv = require('archappenv').AppEnv;
const requireMock = require('mock-require');
const PathResolver = require('../../../dst/lib/util/path.resolver').PathResolver;

describe('path.resolver.js tests', () => {
  describe('#absoluteFile()', () => {
    it('expect to get the absolute file from relative value', () => {
      // arranges
      const val1 = './test/resources/util/index.js';
      const val2 = './test/resources/util/index';
      const val3 = './test/resources/util/';
      const val4 = './test/resources/util';

      const expected = AppEnv.Util.resolveFile('./test/resources/util/index.js');

      // acts
      const result1 = PathResolver.absoluteFile(val1);
      const result2 = PathResolver.absoluteFile(val2);
      const result3 = PathResolver.absoluteFile(val3);
      const result4 = PathResolver.absoluteFile(val4);

      // asserts
      expect(result1).to.equal(expected);
      expect(result2).to.equal(expected);
      expect(result3).to.equal(expected);
      expect(result4).to.equal(expected);
    });

    it('expect to get the absolute file from absolute val', () => {
      // arranges
      const resbase = AppEnv.Util.resolvePath('./test/resources');
      const val1 = path.join(resbase, './util/index.js');
      const val2 = path.join(resbase, './util/index');
      const val3 = path.join(resbase, './util/');
      const val4 = path.join(resbase, './util');

      const expected = AppEnv.Util.resolveFile('./test/resources/util/index.js');

      // acts
      const result1 = PathResolver.absoluteFile(val1);
      const result2 = PathResolver.absoluteFile(val2);
      const result3 = PathResolver.absoluteFile(val3);
      const result4 = PathResolver.absoluteFile(val4);

      // asserts
      expect(result1).to.equal(expected);
      expect(result2).to.equal(expected);
      expect(result3).to.equal(expected);
      expect(result4).to.equal(expected);
    });

    it('expect to get the absolute file with relative base', () => {
      // arranges
      const base = './test/resources'
      const val1 = './util/index.js';
      const val2 = './util/index';
      const val3 = './util/';
      const val4 = './util';

      const expected = AppEnv.Util.resolveFile('./test/resources/util/index.js');

      // acts
      const result1 = PathResolver.absoluteFile(val1, base);
      const result2 = PathResolver.absoluteFile(val2, base);
      const result3 = PathResolver.absoluteFile(val3, base);
      const result4 = PathResolver.absoluteFile(val4, base);

      // asserts
      expect(result1).to.equal(expected);
      expect(result2).to.equal(expected);
      expect(result3).to.equal(expected);
      expect(result4).to.equal(expected);
    });

    it('expect to get the absolute file with absolute base', () => {
      // arranges
      const base = AppEnv.Util.resolvePath('./test/resources');
      const val1 = './util/index.js';
      const val2 = './util/index';
      const val3 = './util/';
      const val4 = './util';

      const expected = AppEnv.Util.resolveFile('./test/resources/util/index.js');

      // acts
      const result1 = PathResolver.absoluteFile(val1, base);
      const result2 = PathResolver.absoluteFile(val2, base);
      const result3 = PathResolver.absoluteFile(val3, base);
      const result4 = PathResolver.absoluteFile(val4, base);

      // asserts
      expect(result1).to.equal(expected);
      expect(result2).to.equal(expected);
      expect(result3).to.equal(expected);
      expect(result4).to.equal(expected);
    });

    it('expect to get the absolute file from absolute val, ignoring base', () => {
      // arranges
      const base = AppEnv.Util.resolvePath('./test/resources');
      const val1 = path.join(base, './util/index.js');
      const val2 = path.join(base, './util/index');
      const val3 = path.join(base, './util/');
      const val4 = path.join(base, './util');

      const expected = AppEnv.Util.resolveFile('./test/resources/util/index.js');

      // acts
      const result1 = PathResolver.absoluteFile(val1, base);
      const result2 = PathResolver.absoluteFile(val2, base);
      const result3 = PathResolver.absoluteFile(val3, base);
      const result4 = PathResolver.absoluteFile(val4, base);

      // asserts
      expect(result1).to.equal(expected);
      expect(result2).to.equal(expected);
      expect(result3).to.equal(expected);
      expect(result4).to.equal(expected);
    });

    it('expect to throw an error when a file does not exist', () => {
      // arranges
      const val = './to/non/exist/file.js';

      // acts
      const act = () => PathResolver.absoluteFile(val);

      // asserts
      expect(act).to.throw(Error);
    });
  });

  describe('#moduleFile()', () => {
    const mockModule1 = 'extmodule1';
    const mockModule2 = 'extmodule2';
    const mockModule3 = 'extmodule3';
    let statStub;

    before(() => {
      const mpkg1 = path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule1, 'package.json');
      const mpkg2 = path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule2, 'package.json');
      const mpkg3 = path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule3, 'package.json');
      requireMock(mpkg1, { main: './lib/index.js' });
      requireMock(mpkg2, { main: './lib/index' });
      requireMock(mpkg3, { main: './lib' });

      const stubDirs = [
        path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule1, './lib'),
        path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule2, './lib'),
        path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule3, './lib'),
      ];
      const stubFiles = [
        path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule1, './lib/index.js'),
        path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule2, './lib/index.js'),
        path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule3, './lib/index.js'),
      ];
      statStub = sinon.stub(fs, 'statSync');
      statStub.callsFake((val) => {
        if (stubDirs.indexOf(val) > -1) {
          return { isDirectory: () => true };
        } else if (stubFiles.indexOf(val) > -1) {
          return { isDirectory: () => false };
        } else {
          throw new Error(`Error in Test Stub: value - ${val}`);
        }
      });
    });

    after(() => {
      statStub.restore();
      requireMock.stopAll();
    });

    it('expect to get the absolute module file', () => {
      // arranges
      const expected1 = path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule1, './lib/index.js')
      const expected2 = path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule2, './lib/index.js')
      const expected3 = path.join(AppEnv.Util.packagePath(), 'node_modules', mockModule3, './lib/index.js')

      // acts
      const result1 = PathResolver.moduleFile(mockModule1);
      const result2 = PathResolver.moduleFile(mockModule2);
      const result3 = PathResolver.moduleFile(mockModule3);

      // asserts
      expect(result1).to.equal(expected1);
      expect(result2).to.equal(expected2);
      expect(result3).to.equal(expected3);
    });
  });
});
