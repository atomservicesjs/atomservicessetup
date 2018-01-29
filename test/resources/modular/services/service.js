const SFService = require('../../composition/common/sfservice');

const sfc = {
  name: 'name',
  properties: {},
  as: 'as',
  service: SFService,
  publish: [
    { topic: 'topic01', type: 'type01A', quality: 'quality01A', as: 'as01' },
    { topic: 'topic01', type: 'type01B', quality: 'quality01B', },
    { topic: 'topic02', type: 'type02', quality: 'quality02', as: 'as02' }
  ],
  subscribe: [
    { topic: 'topic01', type: 'type01', quality: 'quality01' },
    { topic: 'topic02', type: 'type02', quality: 'quality02' },
  ],
  initializer: { val: 'initializer' }
};

module.exports = sfc;
