// Module + global augmentations for the Auth Modals extension.
//
// `flarum.reg` is provided by the runtime registry but isn't surfaced in
// core's typings — we use `asyncModuleImport` to fetch Flarum 2.0 code-split
// modal chunks at runtime.

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace flarum {
    const reg: {
      asyncModuleImport(id: string): Promise<unknown>;
    };
  }
}

export {};
