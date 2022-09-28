# TextMe Dashboard v2

This project uses `yarn` as its only package manager. To ensure everyone is using the same one, it has been **explicitely** defined in `package.json`

## Startup

This project uses [nvm](https://github.com/nvm-sh/nvm) to install & use specific versions of npm.

Run the following:
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
OR
`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
Then run `nvm use` at the root of the project. It'll make sure every developer works with the same node version.

## Linting

`eslint`: Run `yarn lint` to check of any lint
`prettier`: Run `yarn prettier` to run & format the code if needed. (Remember it writes the code in-place)

### For those using VSCode

We've created a `.vscode/` folder add the root of the project. It has a defined config to automatically run prettier.
