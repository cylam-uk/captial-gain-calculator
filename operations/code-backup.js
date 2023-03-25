import { CodeBackup } from "#~/util/index.js";
import config from "#~/secrets/code-backup-config.js";

let codeBackup = new CodeBackup(config);
await codeBackup.backup();