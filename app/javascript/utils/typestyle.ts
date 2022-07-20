import { style, media } from 'typestyle';

export default (styles: Object): Record<string, string> => {
  let mapped = {};
  Object
    .keys(styles)
    .map(
      function (key: string): void {
        mapped[key] = style.apply(
          this,
          [
            styles[key],
            ...(styles[key].media || [])
              .map(m => media(m.query, m.rules)
              )
          ]
        );
      }
    );

  return mapped;
};
