import ncp from "copy-paste";
import { minify } from "minify";

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
