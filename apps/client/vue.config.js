const { defineConfig } = require('@vue/cli-service');

const ATTRIBUTE_TEST_NAME = 'data-test';

const ELEMENT_NODE = 1;
const ATTRIBUTE_NODE = 6;

function removeAttributeTestFromNode(node) {
  if (node.type === ELEMENT_NODE) {
    node.props = node.props.filter((prop) => {
      return prop.type === ATTRIBUTE_NODE ? prop.name !== ATTRIBUTE_TEST_NAME : true;
    });
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  parallel: false,
  configureWebpack: {
    resolve: {
      alias: {
        '~': __dirname,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          nodeTransforms: [removeAttributeTestFromNode],
        };

        return options;
      });
  },
});
