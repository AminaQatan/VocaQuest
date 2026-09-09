# Upload VocaQuest to GitHub

Repository: https://github.com/AminaQatan/VocaQuest

## Upload using a computer

1. Download and extract `VocaQuest-source.zip`.
2. Open the extracted `VocaQuest` folder. It contains `app`, `components`, `public`, `package.json`, and other project files. Enable Show hidden files so `.openai`, `.gitignore`, and `.npmrc` are visible.
3. Open https://github.com/AminaQatan/VocaQuest/upload/main while signed into your GitHub account.
4. Drag the `app` and `components` folders into the upload area. This first batch is below GitHub's 100-file limit. Keep their folder structure.
5. Enter `Add VocaQuest game screens` as the commit message and commit the changes to main.
6. Open Upload files again. Upload all remaining files and folders from inside the extracted VocaQuest folder, including `.openai`, `.gitignore`, and `.npmrc`. Do not select app or components again. This second batch is also below 100 files. Commit with `Add VocaQuest artwork and project files`.
7. Confirm the repository root contains `app`, `components`, `public`, and `package.json`, and that `public/art` contains the PNG artwork.

Upload the extracted contents, not the ZIP file and not the outer VocaQuest folder. GitHub does not automatically extract uploaded ZIP files. A computer is recommended to preserve folders during upload.

GitHub's official guide: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## What this does

This saves the source code publicly. It does not create a playable student website. The complete app also needs its database, recording storage, and verified sign-in service. See README.md for hosting requirements. Future changes made elsewhere are not synchronized automatically.

## Direct upload from this conversation

A direct upload was attempted, but GitHub returned HTTP 403, Resource not accessible by integration. No game files were uploaded through that connection. The repository's access permissions for the connected app must be resolved before an automatic upload can be retried.
