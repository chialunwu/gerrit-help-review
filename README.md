## Introduction
This is a Chrome extension for helping [gerrit](https://gerrit.googlesource.com/gerrit) users to identify the incoming code reviews that he/she hasn't reviewed yet quickly.

## Features
1. Show customizable images based on the review lived time (*Now - Commit 1st submit time*)

   Default:
   
   * Show ![](https://i.imgur.com/sQieR8F.gif) when review age < 1 day
   * Show ![](https://i.imgur.com/bHhE3C3.gif) when 1 day < review age < 2 days
   * Show ![](https://i.imgur.com/bHhE3C3.gif)![test](https://i.imgur.com/bHhE3C3.gif) when review age > 2 days
   * Show ![](https://i.imgur.com/zZwdBZK.png) if reviewed but new patchset submitted

2. Show review lived time with customizable color

   Default:
   
   * Show 14h (green) when review age < 1 day
   * Show 1d (orange) when 1 day < review age < 2 days
   * Show 3d (red) when review age > 2 days

## Screenshots
1. Gerrit review listing page

![](https://i.imgur.com/ecHXnJ6.png)

2. Chrome extension popup settings

![](https://i.imgur.com/0I0nWIX.png)

## Build
1. `npm install`
2. `npm run build`
3. `npm run prepare`
4. Package `GerritHelpReview/` to `.crx` in `chrome://extensions/`

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present
