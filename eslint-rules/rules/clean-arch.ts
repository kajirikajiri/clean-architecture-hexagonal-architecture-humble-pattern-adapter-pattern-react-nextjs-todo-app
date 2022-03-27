import { TSESLint } from "@typescript-eslint/experimental-utils";

const cleanArch: TSESLint.RuleModule<"cleanArch", []> = {
  meta: {
    type: "suggestion",
    messages: {
      cleanArch: "{{ message }}",
    },
    schema: [],
  },
  create: (context) => {
    return {
      ImportDeclaration(node) {
        // HACK: あんまり書き振りは見ないでぇぇ

        // pathに'src/core'が含まれてるか
        // path例 /Users/yhada/dev/project-name/src/core/adapters/foo/index.ts
        const filePath = context.getFilename();
        const existCore = filePath.indexOf("src/core");
        if (existCore === -1) return;

        // pathに'src'が複数あるか
        const splitPaths = filePath.split("/");
        const matchSrcNames = splitPaths.filter((s) => s === "src");
        if (matchSrcNames.length !== 1) return;

        // 'src/core/{layerName}'までpathがあるか
        const srcIndex = splitPaths.indexOf("src");
        const layerIndex = srcIndex + 2;
        if (splitPaths.length < layerIndex - 1) return;

        // import文にcoreが含まれているか
        // import文例 import { FooModel } from 'core/domains/models/foo'
        const importPath = node.source.value;
        if (typeof importPath !== "string") return;
        const existImportCorePath = importPath.indexOf("core");
        if (existImportCorePath === -1) return;

        // 'core/{layerName}/{resourceName}/{fileName}'までpathがあるか
        const splitImportPaths = importPath.split("/");
        if (splitImportPaths.length < 3) return;

        // 該当のファイルとimportで呼んでいるファイルがクリーンアーキテクチャのどの層か取得
        const layer = splitPaths[layerIndex];
        const importLayer = splitImportPaths[1];

        // HACK: 関数分ける
        if (layer === "domains") {
          if (
            importLayer === "usecases" ||
            importLayer === "adapters" ||
            importLayer === "infrastructures" ||
            importLayer === "view-models"
          ) {
            context.report({
              node,
              messageId: "cleanArch",
              data: {
                message: `domainsでは${importLayer}のモジュールをインポートできないよ`,
              },
            });
          }
        }

        if (layer === "usecases") {
          if (importLayer === "adapters" || importLayer === "infrastructures") {
            context.report({
              node,
              messageId: "cleanArch",
              data: {
                message: `usecasesでは${importLayer}のモジュールをインポートできないよ`,
              },
            });
          }
        }

        if (layer === "view-models") {
          if (
            importLayer === "adapters" ||
            importLayer === "infrastructures" ||
            importLayer === "usecases"
          ) {
            context.report({
              node,
              messageId: "cleanArch",
              data: {
                message: `view-modelsではdomain modelかcomponentのモジュールしかインポートできないよ`,
              },
            });
          }
        }
      },
    };
  },
};

module.exports = cleanArch;

// テストの時に import したいのでexport defaultしてる
export default cleanArch;