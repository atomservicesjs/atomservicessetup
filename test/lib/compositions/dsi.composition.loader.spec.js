'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const CompositionSetupLoader = require('../../../dst/lib/composition.setup.loader').CompositionSetupLoader;

describe('composition.setup.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to load a composition in DSI formatted', () => {
      // arranges
      const val = './test/resources/composition/dsi';
      const expected = {
        defineds: [{
          val: 'defined'
        }],
        setups: [{
          val: 'setup'
        }],
        initializers: [{
          val: 'initializer'
        }]
      };

      // acts
      const result = CompositionSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load a composition in DSI formatted', () => {
      // arranges
      const val = './test/resources/composition/dsi/case';
      const expected = {
        defineds: [{
          val: 'defined'
        }],
        setups: [{
          val: 'setup'
        }],
        initializers: [{
          val: 'initializer'
        }]
      };

      // acts
      const result = CompositionSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
