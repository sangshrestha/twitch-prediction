import { minify } from "minify";
import ncp from "copy-paste";

const { copy } = ncp;

async function minifyCode() {
  const minifiedOut = await minify("./gamba.js");
  const bookmarkletOut = `javascript:(${encodeURIComponent(
    `function(){${minifiedOut}})()`,
  )}`;
  copy(bookmarkletOut, () => {
    console.log(bookmarkletOut);
    console.log("Copied to clipboard!");
  });
}
minifyCode();
