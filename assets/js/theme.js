/**
 * @author doctorbhatti
 * @email dochassan12@outlook.com
 * @create date 2021-03-15 01:17:10
 * @modify date 2021-03-15 20:29:41
 * @desc [description]
 */

'use strict'
const ThemeConfig = /** @class */ (function () {
  function ThemeConfig () {
    this.themeChangeHandlers = []
  }
  ThemeConfig.prototype.loadTheme = function () {
    return localStorage.getItem('theme')
  }
  ThemeConfig.prototype.saveTheme = function (theme) {
    if (theme === null) {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', theme)
    }
  }
  ThemeConfig.prototype.initTheme = function () {
    this.displayTheme(this.getTheme())
  }
  ThemeConfig.prototype.detectTheme = function () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  ThemeConfig.prototype.getTheme = function () {
    return this.loadTheme() || this.detectTheme()
  }
  ThemeConfig.prototype.setTheme = function (theme) {
    this.saveTheme(theme)
    this.displayTheme(theme)
  }
  ThemeConfig.prototype.displayTheme = function (theme) {
    document.body.setAttribute('data-theme', theme)
    for (let _i = 0, _a = this.themeChangeHandlers; _i < _a.length; _i++) {
      const handler = _a[_i]
      handler(theme)
    }
  }
  return ThemeConfig
}())
function writeDarkSwitch (config) {
  document.write('\n<div class="custom-control custom-switch">\n<input type="checkbox" class="custom-control-input" id="darkSwitch">\n<label class="custom-control-label" for="darkSwitch"><span class="mdl-list__item-primary-content">Dark/Light Mode</span></label>\n</div>\n')
  const darkSwitch = document.getElementById('darkSwitch')
  darkSwitch.checked = config.getTheme() === 'dark'
  darkSwitch.onchange = function () {
    config.setTheme(darkSwitch.checked ? 'dark' : 'light')
  }
  config.themeChangeHandlers.push(function (theme) { return darkSwitch.checked = theme === 'dark' })
  return darkSwitch
}
