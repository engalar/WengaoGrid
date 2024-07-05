import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

// 自定义插件  https://astexplorer.net/#/KJ8AjD6maa
function rewriteReactImports() {
    return {
        name: "rewrite-react-imports",
        enforce: "pre",
        transform(code, id) {
            if (id.endsWith(".js") || id.endsWith(".jsx") || id.endsWith(".ts") || id.endsWith(".tsx")) {
                // 使用 Babel 解析器解析代码
                const ast = parse(code, { sourceType: "module", plugins: ["jsx", "typescript"] });

                // 遍历 AST 并修改导入语句
                traverse(ast, {
                    ImportDeclaration(path) {
                        if (path.node.source.value === "react") {
                            path.node.source.value = "http://localhost:8080/dist/commons.js";
                            // 修改 react 的导入
                            const specifiers = path.node.specifiers
                                .map(specifier => {
                                    if (t.isImportSpecifier(specifier)) {
                                        return t.variableDeclarator(
                                            t.objectPattern([t.objectProperty(specifier.imported, specifier.local)]),
                                            t.memberExpression(
                                                t.identifier("reactExports"),
                                                t.identifier(specifier.imported.name)
                                            )
                                        );
                                    }
                                    return null;
                                })
                                .filter(Boolean);

                            const importedSpecifiers = path.node.specifiers.map(specifier => {
                                return t.objectProperty(
                                    t.identifier(specifier.imported.name),
                                    t.identifier(specifier.imported.name),
                                    false,
                                    true
                                );
                            });

                            const variableDeclaration = t.variableDeclaration("const", [
                                t.variableDeclarator(t.objectPattern(importedSpecifiers), t.identifier("reactExports"))
                            ]);

                            path.insertAfter(variableDeclaration);
                            // replace path.node.specifiers with a new object specifiters
                            path.node.specifiers = [
                                t.importSpecifier(t.identifier("reactExports"), t.identifier("reactExports"))
                            ];
                        } else if (path.node.source.value === "react/jsx-dev-runtime") {
                            // 修改 react/jsx-dev-runtime 的导入
                            path.replaceWith(
                                t.variableDeclaration("const", [
                                    t.variableDeclarator(
                                        t.objectPattern([
                                            t.objectProperty(t.identifier("jsxDEV"), t.identifier("jsxDEV"))
                                        ]),
                                        t.memberExpression(t.identifier("reactExports"), t.identifier("createElement"))
                                    )
                                ])
                            );
                        }
                    }
                });

                // 使用 Babel 生成器生成新的代码
                const output = generate(ast, { retainLines: true });
                return {
                    code: output.code,
                    map: output.map
                };
            }
            return null;
        }
    };
}
export default defineConfig({
    plugins: [react(), Inspect(), rewriteReactImports()]
});
