declare namespace Cypress {
  interface ResolvedConfigOptions {
    hideXHR?: boolean;
  }

  interface Cypress {
    runner: any;
  }
}

declare module "fs-extra";
