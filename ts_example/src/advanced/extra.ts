type TemplateLiteralKeys = `${'id' | 'title' | 'author'}`;

type ObjWithKeys<U extends string> = {
  [K in U as Uppercase<K>]: `${K}`;
};

type testObjWithKey = ObjWithKeys<TemplateLiteralKeys>;
type testObjWithKey2 = Record<Uppercase<TemplateLiteralKeys>, string>;

//----------------------------------------------------------
