"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyDocument)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n    static async getInitialProps(ctx) {\n        const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_2__.ServerStyleSheet();\n        const originalRenderPage = ctx.renderPage;\n        try {\n            ctx.renderPage = ()=>originalRenderPage({\n                    enhanceApp: (App)=>(props)=>sheet.collectStyles(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, {\n                                ...props\n                            }, void 0, false, {\n                                fileName: \"D:\\\\carlink\\\\carlink-user\\\\pages\\\\_document.js\",\n                                lineNumber: 12,\n                                columnNumber: 63\n                            }, this))\n                });\n            const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);\n            return {\n                ...initialProps,\n                styles: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        initialProps.styles,\n                        sheet.getStyleElement()\n                    ]\n                }, void 0, true)\n            };\n        } finally{\n            sheet.seal();\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBcUM7QUFDZ0I7QUFFdEMsTUFBTUUsbUJBQW1CRixzREFBUUE7SUFDOUMsYUFBYUcsZ0JBQWdCQyxHQUFHLEVBQUU7UUFDaEMsTUFBTUMsUUFBUSxJQUFJSiwrREFBZ0JBO1FBQ2xDLE1BQU1LLHFCQUFxQkYsSUFBSUcsVUFBVTtRQUV6QyxJQUFJO1lBQ0ZILElBQUlHLFVBQVUsR0FBRyxJQUNmRCxtQkFBbUI7b0JBQ2pCRSxZQUFZLENBQUNDLE1BQVEsQ0FBQ0MsUUFBVUwsTUFBTU0sYUFBYSxlQUFDLDhEQUFDRjtnQ0FBSyxHQUFHQyxLQUFLOzs7Ozs7Z0JBQ3BFO1lBRUYsTUFBTUUsZUFBZSxNQUFNWixvRUFBd0IsQ0FBQ0k7WUFDcEQsT0FBTztnQkFDTCxHQUFHUSxZQUFZO2dCQUNmQyxzQkFDRTs7d0JBQ0dELGFBQWFDLE1BQU07d0JBQ25CUixNQUFNUyxlQUFlOzs7WUFHNUI7UUFDRixTQUFVO1lBQ1JULE1BQU1VLElBQUk7UUFDWjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXJsaW5rLXVzZXIvLi9wYWdlcy9fZG9jdW1lbnQuanM/NTM4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9jdW1lbnQgZnJvbSAnbmV4dC9kb2N1bWVudCc7XHJcbmltcG9ydCB7IFNlcnZlclN0eWxlU2hlZXQgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeURvY3VtZW50IGV4dGVuZHMgRG9jdW1lbnQge1xyXG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoY3R4KSB7XHJcbiAgICBjb25zdCBzaGVldCA9IG5ldyBTZXJ2ZXJTdHlsZVNoZWV0KCk7XHJcbiAgICBjb25zdCBvcmlnaW5hbFJlbmRlclBhZ2UgPSBjdHgucmVuZGVyUGFnZTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjdHgucmVuZGVyUGFnZSA9ICgpID0+XHJcbiAgICAgICAgb3JpZ2luYWxSZW5kZXJQYWdlKHtcclxuICAgICAgICAgIGVuaGFuY2VBcHA6IChBcHApID0+IChwcm9wcykgPT4gc2hlZXQuY29sbGVjdFN0eWxlcyg8QXBwIHsuLi5wcm9wc30gLz4pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgaW5pdGlhbFByb3BzID0gYXdhaXQgRG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uaW5pdGlhbFByb3BzLFxyXG4gICAgICAgIHN0eWxlczogKFxyXG4gICAgICAgICAgPD5cclxuICAgICAgICAgICAge2luaXRpYWxQcm9wcy5zdHlsZXN9XHJcbiAgICAgICAgICAgIHtzaGVldC5nZXRTdHlsZUVsZW1lbnQoKX1cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICksXHJcbiAgICAgIH07XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzaGVldC5zZWFsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIkRvY3VtZW50IiwiU2VydmVyU3R5bGVTaGVldCIsIk15RG9jdW1lbnQiLCJnZXRJbml0aWFsUHJvcHMiLCJjdHgiLCJzaGVldCIsIm9yaWdpbmFsUmVuZGVyUGFnZSIsInJlbmRlclBhZ2UiLCJlbmhhbmNlQXBwIiwiQXBwIiwicHJvcHMiLCJjb2xsZWN0U3R5bGVzIiwiaW5pdGlhbFByb3BzIiwic3R5bGVzIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VhbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.js\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("styled-components");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.js")));
module.exports = __webpack_exports__;

})();