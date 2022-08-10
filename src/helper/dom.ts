export const css = (
  target: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) => {
  Object.keys(styles).forEach((key: string) => {
    // @ts-ignore
    target.style[key] = styles[key];
  });
};
