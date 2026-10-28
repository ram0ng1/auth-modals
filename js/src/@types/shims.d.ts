// `flarum.reg` existe em tempo de execução, mas os typings do core não o
// expõem; o `asyncModuleImport` abre os modais, que são chunks sob demanda.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace flarum {
    const reg: {
      asyncModuleImport(id: string): Promise<unknown>;
    };
  }
}

export {};
