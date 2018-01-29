'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const SFService = require('../../resources/composition/common/sfservice');
const CompositionSetupLoader = require('../../../dst/lib/composition.setup.loader').CompositionSetupLoader;
const CompositionType = require('../../../dst/lib/compositions/composition.type').CompositionType;

describe('composition.setup.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to load a services composition in SFC formatted, #1', () => {
      // arranges
      const val = './test/resources/composition/sfc/services';
      const expected = {
        defineds: [SFService],
        setups: [{
          name: 'name',
          as: 'as',
          properties: {},
          service: 'SFService',
          channels: {
            publish: [
              {
                topic: 'topic01',
                natures: [
                  { type: 'type01A', quality: 'quality01A', as: 'as01' },
                  { type: 'type01B', quality: 'quality01B' },
                ],
              },
              {
                topic: 'topic02',
                natures: [
                  { type: 'type02', quality: 'quality02', as: 'as02' },
                ],
              }
            ],
            subscribe: [
              {
                topic: 'topic01',
                natures: [{ type: 'type01', quality: 'quality01' }]
              },
              {
                topic: 'topic02',
                natures: [
                  { type: 'type02A', quality: 'quality02' },
                  { type: 'type02B', quality: 'quality02' },
                ]
              },
            ]
          }
        }],
        initializers: [{ as: 'as', initializer: { val: 'initializer' } }],
      };

      // acts
      const result = CompositionSetupLoader.load(val, undefined, CompositionType.Services);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load a services composition in SFC less formatted, #2', () => {
      // arranges
      const val = './test/resources/composition/sfc/services/less';
      const expected = {
        defineds: [SFService],
        setups: [{
          name: 'embedded',
          service: 'SFService',
          channels: {}
        }],
        initializers: []
      };

      // acts
      const result = CompositionSetupLoader.load(val, undefined, CompositionType.Services);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load a toolsets composition in SFC formatted, #1', () => {
      // arranges
      const val = './test/resources/composition/sfc/toolsets';
      const expected = {
        defineds: [{
          toolsets: 'name',
          asset: { val: 'toolsets' },
          as: 'as'
        }],
        setups: [{
          name: 'name',
          toolsets: 'name',
          properties: {}
        }],
        initializers: [{ as: 'as', initializer: { val: 'initializer' } }]
      };

      // acts
      const result = CompositionSetupLoader.load(val, undefined, CompositionType.Toolsets);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load a toolsets composition in SFC less formatted, #2', () => {
      // arranges
      const val = './test/resources/composition/sfc/toolsets/less';
      const expected = {
        defineds: [{
          toolsets: 'embedded',
          asset: { val: 'toolsets' },
          as: 'as'
        }],
        setups: [{
          name: 'embedded',
          toolsets: 'embedded'
        }],
        initializers: []
      };

      // acts
      const result = CompositionSetupLoader.load(val, undefined, CompositionType.Toolsets);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
