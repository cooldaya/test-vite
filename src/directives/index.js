const directives = import.meta.glob(["./v-*.js"], {
  eager: true,
});

console.log(directives);
export default {
  install(app) {
    for (const fileName in directives) {
      const directiveName = fileName.replace("./v-", "").replace(".js", "");
      const directiveModule = directives[fileName].default;
      app.directive(directiveName, directiveModule);
    }
  },
};
