// One-Line Laugh-Off entry: writes a single funny line to /output/entry.txt.
// The output directory is MAKEFUN_OUTPUT_DIR when set (local runs), else /output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My phone's autocorrect changed 'I love you' to 'I love tacos' — and honestly, my wife agrees it was the more accurate text.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate self-check (RULES.txt): entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space, on a single line.
const trimmed = LINE.trim();
if (trimmed.length < 1 || trimmed.length > 200) {
  throw new Error(`entry is ${trimmed.length} chars, outside the 1–200 range`);
}
if (/\n/.test(trimmed)) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${LINE.length} chars)`);
