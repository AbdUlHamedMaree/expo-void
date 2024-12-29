export interface DeepPickGrammar {
  array: string;
  prop: string;
  omit: string;
  mutate: string;
  glob: string;
}

export interface DefaultGrammar {
  array: '[]';
  prop: '.';
  omit: '!';
  mutate: '~';
  glob: '*';
}
