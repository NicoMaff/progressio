import { constants } from "node:fs"
import { copyFile } from "node:fs/promises"
import { dirname, extname, basename, join } from "node:path"

export default class WorkFileBackupService {
  async run(workFilePath: string, now = new Date()) {
    const extension = extname(workFilePath)
    const fileName = basename(workFilePath, extension)
    const timestamp = now.toISOString().replaceAll(":", "-").replaceAll(".", "-")
    const backupPath = join(dirname(workFilePath), `${fileName}.backup-${timestamp}${extension}`)

    await copyFile(workFilePath, backupPath, constants.COPYFILE_EXCL)

    return backupPath
  }
}
