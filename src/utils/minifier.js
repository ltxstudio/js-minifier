import * as Terser from 'terser';

export const minifyCode = async (code) => {
  try {
    const minified = await Terser.minify(code);
    return minified.code;
  } catch (error) {
    console.error('Minification failed:', error);
    return null;
  }
};
