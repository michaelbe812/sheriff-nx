import { noDependencies, sameTag, SheriffConfig } from '@softarc/sheriff-core';

const api = (from: string, to: string) => ({
  [`feature:${from}`]: `feature:${to}:api`,
});

export const config: SheriffConfig = {
  enableBarrelLess: true,
  showWarningOnBarrelCollision: false,

  modules: {

  },
  depRules: {

  },
};
