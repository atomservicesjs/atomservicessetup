'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const AppEnv = require('archappenv').AppEnv;
const PathResolver = require('../../dst/lib/util/path.resolver').PathResolver;
const ApplicationSetupLoader = require('../../dst/lib/application.setup.loader').ApplicationSetupLoader;

describe('application.setup.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to load an application with no modulars', () => {
      // arranges
      const base = './test/resources/application';
      const expected = { name: 'AtomApplication', modulars: [] };

      // acts
      const result = ApplicationSetupLoader.load(undefined, base);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load an application with no modulars', () => {
      // arranges
      const val = './test/resources/application/empty';
      const expected = { name: 'EmptyApplication', modulars: [] };

      // acts
      const result = ApplicationSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load an application with structure modulars', () => {
      // arranges
      const val = './test/resources/application/struct';
      const expected = {
        name: 'StructureApplication',
        modulars: [{ name: 'EmptyModular' }]
      };

      // acts
      const result = ApplicationSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load an application with structure modulars', () => {
      // arranges
      const val = './test/resources/application/struct-as.js'
      const expected = {
        name: 'StructureApplication',
        modulars: [{ name: 'AsModular' }]
      };

      // acts
      const result = ApplicationSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load an application with props modulars', () => {
      // arranges
      const val = './test/resources/application/props-app.js';
      const expected = {
        name: 'PropsApplication',
        modulars: [{ name: 'MainModular' }]
      };

      // acts
      const result = ApplicationSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#findAppFile()', () => {
    it('expect to find an application setup file', () => {
      // arranges
      const expected = PathResolver.absoluteFile('./test/resources/application/atom.app.js');

      // acts
      const result = ApplicationSetupLoader.findAppFile('./test/resources/application');

      // asserts
      expect(result).to.equal(expected);
    });

    it('expect to throw an error when found multiple application setup files', () => {
      // arranges

      // acts
      const act = () => ApplicationSetupLoader.findAppFile();

      // asserts
      expect(act).to.throw(Error);
    });

    it('expect to throw an error when found no application setup files', () => {
      // arranges

      // acts
      const act = () => ApplicationSetupLoader.findAppFile('./test/lib');

      // asserts
      expect(act).to.throw(Error);
    });
  });
});
