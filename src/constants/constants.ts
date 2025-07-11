export const IS_DARK = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const EMPTY_CHAR = "\u00A0";
// export const BLACK = "rgb(33,53,71)";
export const BLACK = "rgb(36,36,36)";
export const WHITE = "rgb(255,255,255)";
export const PINK = "rgb(255, 94, 102)";
export const ngColor = "rgb(193, 0, 0)";

export const FOREGROUND_COLOR = IS_DARK ? WHITE : BLACK;
export const BACKGROUND_COLOR = IS_DARK ? BLACK : WHITE;

export const DEBUG_MODE = false

export const baseInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 0',
    fontSize: '1.6em',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: "inherit",
    fontWeight: "700",
    boxSizing: 'border-box'
};
