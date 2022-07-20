import Rails from '@rails/ujs';

type CustomRails = typeof Rails & {
  replaceElement: (currentEl: HTMLElement, newEl: HTMLElement) => HTMLElement;
  nodeFromString: (str: string) => DocumentFragment;
}

declare global {
  interface Window {
    Rails: CustomRails;
  }
}

Rails.start();

if (window) {
  window.Rails = Rails as CustomRails;
}

// extra functions are from https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.md

(Rails as CustomRails).replaceElement = function replaceElement (currentEl, newEl) {
  const parentNode = currentEl.parentNode;
  return parentNode.replaceChild(newEl, currentEl);
};

(Rails as CustomRails).nodeFromString = function (str) {
  const range = document.createRange();
  const parse = range.createContextualFragment.bind(range) as (fragment: string) => DocumentFragment;

  return parse(str);
};
