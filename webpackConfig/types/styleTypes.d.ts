

type styleImport = { [className: string]: string }
interface lazyStyleImport {
  locals: styleImport;
  use():void;
  unuse():void;
}


//--declare lazy tag--------------------------------------------------------------------
declare module "*!lazy" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.sass" {
  const styles: lazyStyleImport;
  export default styles;
}

declare module "*.lazy.global.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.global.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.global.sass" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.pure.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.pure.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.pure.sass" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.sass" {
  const styles: lazyStyleImport;
  export default styles;
}

declare module "*.lazy.icss.global.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.global.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.global.sass" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.pure.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.pure.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.icss.pure.sass" {
  const styles: lazyStyleImport;
  export default styles;
}

declare module "*.lazy.global.icss.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.global.icss.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.global.icss.sass" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.pure.icss.css" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.pure.icss.scss" {
  const styles: lazyStyleImport;
  export default styles;
}
declare module "*.lazy.pure.icss.sass" {
  const styles: lazyStyleImport;
  export default styles;
}


//--declare regular css------------------------------------------------------------------

declare module "*.css" {
  const styles: styleImport;
  export default styles;
}

declare module "*.scss" {
  const styles: styleImport;
  export default styles;
}

declare module "*.sass" {
  const styles: styleImport;
  export default styles;
}
