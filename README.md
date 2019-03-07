# titanized

[![Greenkeeper badge](https://badges.greenkeeper.io/appcelerator/titanized.svg)](https://greenkeeper.io/)

> Modernized APIs and utilities for Axway Titanium :rocket:

## Features

Promise based async workflows and other usefull utilities wrapping the battle tested Titanium APIs for a modernized developing experience.

* Use the popular [axios](https://github.com/axios/axios/) http client inside Titanium :white_check_mark:
* Promise based APIs for async operations :construction:
  * Dialogs (alert, confirm, prompt, login. options and custom dialogs)
  * Pickers (date and timer picker as well as custom pickers)
  * Camera access
  * Streams
* Query device environemnt (current platform, permissions. etc) :construction:
* And more ...

Legend: :white_check_mark: Done, :construction: Work in progress

> :bulb: If you have ideas or a feature request for more workflows that should be covered by this library don't hesitate to file a [new issue](https://github.com/appcelerator/titanized/issues/new) or better, open a [pull request](/compare).

## Installation

Classic project:
```bash
cd Resources
npm i titanized -S
```

Alloy project:
```bash
cd app/
npm i titanized -S
```

Angular or Vue.js project:
```bash
npm i titanized -S
```

## Documentation

:construction: Work in progress ...

## Contributing

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator/titanized/issues/new) first and submit a [pull request](https://github.com/appcelerator/titanized/pulls/new) against master.

Before you contribute read through the following guidelines.

* The `master` branch contains a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**
* Checkout relevant topic branches, e.g. `develop` and merge back against that branch.
* Your commit messages should follow the [Conventional Commits Specification](https://conventionalcommits.org/) so that changelogs and version bumps can be automatically generated. If you are not familiar with the commit message convention, you can use `npm run commit` instead of git commit, which provides an interactive CLI for generating proper commit messages.
* We will let GitHub automatically squash your PR before merging, so don't worry about making multiple small commits.

## Getting Help

If you have questions about this library, feel free to reach out on Stackoverflow or the
`#helpme` channel on [TiSlack](http://tislack.org). In case you find a bug, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License. Version 2.0
