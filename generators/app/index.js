'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs-extra')
const path = require('path')
const { get, each, startsWith } = require('lodash');

module.exports = class extends Generator {
  initializing () {
    this.defaults = {
      template: 'vue3',
      packageName: 'vue3-template-test',
      packageDescription: 'vue3 project template',
      packageKeywords: '关键词'
    }
    this.props = {}
  }

  prompting() {
    this.log(
      yosay(
        `Welcome to the good ${chalk.red('generator-zhanheng-project-init')} generator!`
      )
    );
    const prompts = [
      {
        type: 'list',
        name: 'template',
        message: '选择初始化模板',
        choices: [
          { name: 'vue3', value: 'vue3' }
        ],
        default: get(this.defaults, 'template')
      },
      {
        type: 'input',
        name: 'packageName',
        message: '项目名称（package.json[name]）',
        default: get(this.defaults, 'packageName')
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: '项目描述（package.json[description]）',
        default: get(this.defaults, 'packageDescription')
      },
      {
        type: 'input',
        name: 'packageKeywords',
        message: '项目关键词（package.json[keywords]）',
        default: get(this.defaults, 'packageKeywords')
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default () {
    const props = this.props
    const destPath = this.destinationPath()
    const desDir = path.resolve(destPath, props.packageName)
    if (!fs.pathExistsSync(desDir)) {
      fs.mkdirp(desDir)
    }
    this.destinationRoot(desDir)
  }

  writing() {
    const props = this.props
    const templatePath = this.templatePath(props.template)
    const moveFile = (tmPpath) => {
      this.fs.copyTpl(
        path.join(templatePath, tmPpath),
        this.destinationPath(tmPpath),
        props
      )
    }
    const walk = (filePath = './') => {
      const tplPath = path.resolve(templatePath, filePath)
      const stats = fs.statSync(tplPath)
      if (stats.isDirectory()) {
        return fs.readdir(tplPath, (_err, files) => {
          each(files, fileStr => {
            walk(filePath + '/' + fileStr)
          })
        })
      }
      moveFile(startsWith(filePath, './/') ? filePath.slice(3) : filePath)
    }
    walk()
  }

  install() {
    this.spawnCommandSync('pnpm', ['install'])
  }

  end () {
    const props = this.props
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(props.packageName)}`);
    console.log(`\r\n  cd ${chalk.cyan(props.packageName)}`);
    console.log(`  ${chalk.cyan('pnpm dev')}\r\n`);
  }
};
