import path from "path";
import { readCsv } from "#~/util/index.js";

export async function readDataset(datasetName) {
  const datasetPath = path.join(process.cwd(), "operations", "init-database", "data", datasetName);
  const [brokeraccounts, fxrates, sharetrades] =
    await Promise.all(
      ["brokeraccounts", "fxrates", "sharetrades"]
        .map(x => path.join(datasetPath, x + ".csv"))
        .map(readCsv)
    );
  return {brokeraccounts, fxrates, sharetrades};
}