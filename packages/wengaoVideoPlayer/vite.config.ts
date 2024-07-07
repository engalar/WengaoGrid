import { PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

const commonExternalLibs = [
    // "mendix" and internals under "mendix/"
    /^mendix($|\/)/,

    // "react"
    /^react$/,

    // "react/jsx-runtime"
    /^react\/jsx-runtime$/,

    // "react-dom"
    /^react-dom$/
];

const webExternal = [...commonExternalLibs, /^big.js$/];

// https://astexplorer.net/#/KJ8AjD6maa
// https://babeljs.io/repl
// https://www.typescriptlang.org/play
function rewriteReactImports(): PluginOption {
    let severUrl;
    return {
        name: "rewrite-react-imports",
        // enforce: "pre",
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
                            // import { jsxRuntimeExports } from 'http://localhost:8080/dist/commons.js';
                            // const { jsx: jsxDEV } = jsxRuntimeExports;
                            path.replaceWithMultiple([
                                t.importDeclaration(
                                    [
                                        t.importSpecifier(
                                            t.identifier("jsxRuntimeExports"),
                                            t.identifier("jsxRuntimeExports")
                                        )
                                    ],
                                    t.stringLiteral("http://localhost:8080/dist/commons.js")
                                ),
                                t.variableDeclaration("const", [
                                    t.variableDeclarator(
                                        t.objectPattern([
                                            t.objectProperty(t.identifier("jsx"), t.identifier("jsxDEV"))
                                        ]),
                                        t.identifier("jsxRuntimeExports")
                                    )
                                ])
                            ]);
                        } else if (path.node.source.value === "big.js") {
                            path.replaceWith(
                                t.importDeclaration(
                                    [t.importSpecifier(t.identifier("Big"), t.identifier("Big"))],
                                    t.stringLiteral("http://localhost:8080/dist/commons.js")
                                )
                            );
                        } else if (path.node.source.value === "mendix") {
                            if (path.node.specifiers.length === 1 && t.isImportSpecifier(path.node.specifiers[0])) {
                                path.replaceWith(
                                    t.variableDeclaration("const", [
                                        t.variableDeclarator(
                                            t.identifier("ValueStatus"),
                                            t.objectExpression([
                                                t.objectProperty(
                                                    t.identifier("Available"),
                                                    t.stringLiteral("available")
                                                ),
                                                t.objectProperty(
                                                    t.identifier("Unavailable"),
                                                    t.stringLiteral("unavailable")
                                                ),
                                                t.objectProperty(t.identifier("Loading"), t.stringLiteral("loading"))
                                            ])
                                        )
                                    ])
                                );
                            }
                        } else {
                            // append severUrl to other imports
                            // path.node.source.value = `${severUrl}/${path.node.source.value}`;
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
        },
        configureServer(server) {
            server.httpServer?.once("listening", () => {
                const address: any = server.httpServer?.address();
                severUrl = `http://${address.family === "IPv6" ? `[${address.address}]` : address.address}:${
                    address.port
                }`;
            });
        }
    };
}

export default defineConfig({
    plugins: [react(), Inspect(), rewriteReactImports()]
});
