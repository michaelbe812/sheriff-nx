import { noDependencies, sameTag, SheriffConfig } from '@softarc/sheriff-core';

const api = (from: string, to: string) => ({
  [`feature:${from}`]: `feature:${to}:api`,
});

export const config: SheriffConfig = {
  enableBarrelLess: true,
  showWarningOnBarrelCollision: false,

  modules: {
    apps: {
      '<app>': ['app:<app>'],
      '<app>/src/app': {
        'shared/<shared>': ['shared'],

        features: {
          '<feature>': ['feature:<feature>', 'type:feature'],
          '<feature>/ui': ['feature:<feature>:api', 'type:ui'],
          '<feature>/data': ['feature:<feature>:data', 'type:data'],
          '<feature>/events': ['feature:<feature>:events', 'type:events'],
          '<feature>/types': ['feature:<feature>:types', 'type:types'],
          '<feature>/api': ['feature:<feature>:api', 'type:api'],
          '<feature>/utils': ['feature:<feature>:utils', 'type:utils'],

          '<feature>/feat-<feat>': ['feature:<feature>:<feat>', 'type:feature'],
          '<feature>/feat-<feat>/api': ['feature:<feature>:<feat>', 'type:api'],
          '<feature>/feat-<feat>/events': [
            'feature:<feature>:<feat>',
            'type:events',
          ],
          '<feature>/feat-<feat>/data': [
            'feature:<feature>:<feat>',
            'type:data',
          ],
          '<feature>/feat-<feat>/ui': ['feature:<feature>:<feat>', 'type:ui'],
          '<feature>/feat-<feat>/types': [
            'feature:<feature>:<feat>',
            'type:types',
          ],
          '<feature>/feat-<feat>/utils': [
            'feature:<feature>:<feat>',
            'type:utils',
          ],
        },
      },
    },
    // 'libs/shared/generated/apis': {
    //   'berater-api/src/lib/api': ['type:api', 'shared'],
    //   'berater-api/src/lib/model': ['type:types', 'shared'],
    // },
  },
  depRules: {
    root: ['type:api', 'type:feature'],
    '*': 'shared',
    'app*': [sameTag, 'root'],
    'type:api': [({ to }) => to.startsWith('type')],
    'type:feature': ({ to }) => to.startsWith('type:'),
    'type:data': ['type:types', 'type:utils', 'type:data', 'type:events'],
    'type:ui': ['type:types', 'type:utils', 'type:events'],
    'type:events': ['type:types', 'type:events'],
    'type:utils': ['type:types', 'type:utils'],
    'type:types': noDependencies,
    ...api('bookings', 'customers'),
    'feature:*': [
      sameTag, // feature:bookings -> feature:bookings
      ({ from, to }) => to.startsWith(from), // feature:bookings -> feature:bookings:feature,
      ({ from, to }) =>
        from.endsWith(':api') && to.startsWith(from.slice(0, -4)), // feature:customers:api -> feature:customers:*
      ({ from, to }) => {
        const toTags = to.split(':');
        const isToSharedDomain =
          toTags.length > 2 &&
          ['data', 'ui', 'types', 'events', 'api', 'utils'].includes(toTags[2]);

        const fromTags = from.split(':');
        const isFromFeature =
          fromTags.length > 2 &&
          !['data', 'ui', 'types', 'events', 'api', 'utils'].includes(
            fromTags[2],
          );

        const isSameDomain = toTags[1] === fromTags[1];

        return isSameDomain && isFromFeature && isToSharedDomain;
      }, // feature:holidays:feat-overview -> feature:holidays:data
      ({ from, to }) => {
        const toTags = to.split(':');
        const fromTags = from.split(':');

        const isToSharedDomain = [
          'data',
          'ui',
          'types',
          'events',
          'api',
          'utils',
        ].includes(toTags[2]);
        const isFromSharedDomain = [
          'data',
          'ui',
          'types',
          'events',
          'api',
          'utils',
        ].includes(fromTags[2]);

        const isSameDomain = toTags[1] === fromTags[1];

        return isSameDomain && isFromSharedDomain && isToSharedDomain;
      }, // feature:holidays:feature -> feature:holidays:data
    ],
  },
};
