'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const SFService = require('../resources/composition/common/sfservice');
const CompositionSetupLoader = require('../../dst/lib/composition.setup.loader').CompositionSetupLoader;
const ModularSetupLoader = require('../../dst/lib/modular.setup.loader').ModularSetupLoader;

describe('modular.setup.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to load a modular setup', () => {
      // arranges
      const val = './test/resources/modular/empty';
      const expected = { name: 'EmptyModular' };

      // acts
      const result = ModularSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load a modular setup', () => {
      // arranges
      const val = './test/resources/modular/extended';
      const expected = {
        name: 'ExtendedModular',
        props: { val: 'extended' },
        services: {
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
                  natures: [{ type: 'type02', quality: 'quality02' }]
                },
              ]
            }
          }],
          initializers: [{ as: 'as', initializer: { val: 'initializer' } }],
        },
        toolsets: {
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
        }
      };

      // acts
      const result = ModularSetupLoader.load(val);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
