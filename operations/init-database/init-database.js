import fs from "fs";
import path from "path";
import readline from "readline-sync";

import pgConnData from "#~/secrets/pg-conn.js";

import { PgConnConfigs, PgClient } from "#~/util/index.js";

function readSql(name) {
  const sqlPath = path.resolve(process.cwd(), `./database/${name}.sql`);
  return fs.readFileSync(sqlPath, "utf8");
}

const pgClient = (function () {
  const configs = new PgConnConfigs(pgConnData);
  const names = configs.getNames();
  const dbProfileName = 'default';
  return new PgClient({
    conn: configs.get(dbProfileName)
  });
})();

let query = (...args) => pgClient.query(...args);

const dataset = await (async function () {
  const datasetNames = fs
  .readdirSync(
    path.resolve(process.cwd(), "./operations/init-database/data"),
    { withFileTypes: true }
  )
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);
  const datasetIndex = readline.keyInSelect(
    datasetNames,
    "Select a dataset:"
  );
  const datasetName = datasetNames[datasetIndex];
  return readDataset(datasetName);
})

console.log("> Initializing tables...");

const sqls = [
  "brokeraccounts","fxrates","sharetrades",
];

for (const sql of sqls) {
  await query(readSql(sql));
}