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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./node_modules/next/font/google/target.css?{\"path\":\"src\\\\pages\\\\_app.js\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"inter\"}":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/font/google/target.css?{"path":"src\\pages\\_app.js","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"} ***!
  \*************************************************************************************************************************************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"style\": {\"fontFamily\":\"'__Inter_a184c8', '__Inter_Fallback_a184c8'\",\"fontStyle\":\"normal\"},\n\t\"className\": \"__className_a184c8\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9mb250L2dvb2dsZS90YXJnZXQuY3NzP3tcInBhdGhcIjpcInNyY1xcXFxwYWdlc1xcXFxfYXBwLmpzXCIsXCJpbXBvcnRcIjpcIkludGVyXCIsXCJhcmd1bWVudHNcIjpbe1wic3Vic2V0c1wiOltcImxhdGluXCJdfV0sXCJ2YXJpYWJsZU5hbWVcIjpcImludGVyXCJ9LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQSxXQUFXLGdGQUFnRjtBQUMzRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzMTMtc2lkZWJhci1leGFtcGxlLy4vbm9kZV9tb2R1bGVzL25leHQvZm9udC9nb29nbGUvdGFyZ2V0LmNzcz80NDRjIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInN0eWxlXCI6IHtcImZvbnRGYW1pbHlcIjpcIidfX0ludGVyX2ExODRjOCcsICdfX0ludGVyX0ZhbGxiYWNrX2ExODRjOCdcIixcImZvbnRTdHlsZVwiOlwibm9ybWFsXCJ9LFxuXHRcImNsYXNzTmFtZVwiOiBcIl9fY2xhc3NOYW1lX2ExODRjOFwiXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/next/font/google/target.css?{\"path\":\"src\\\\pages\\\\_app.js\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"inter\"}\n");

/***/ }),

/***/ "./src/contexts/WalkthroughContext.js":
/*!********************************************!*\
  !*** ./src/contexts/WalkthroughContext.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WalkthroughProvider\": () => (/* binding */ WalkthroughProvider),\n/* harmony export */   \"useWalkthrough\": () => (/* binding */ useWalkthrough)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _joyride_tour_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../joyride/tour-main */ \"./src/joyride/tour-main.js\");\n/* harmony import */ var _joyride_tour_searchpopup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../joyride/tour-searchpopup */ \"./src/joyride/tour-searchpopup.js\");\n\n\n\n\n\nconst WalkthroughContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst WalkthroughProvider = ({ children  })=>{\n    const [run, setRun] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // Initialize as false to prevent auto-running\n    const [stepIndex, setStepIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [steps, setSteps] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [isSearchPopupVisible, setIsSearchPopupVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (router.pathname === \"/\") {\n            setRun(true); // Enable the walkthrough\n            if (isSearchPopupVisible) {\n                setSteps(_joyride_tour_searchpopup__WEBPACK_IMPORTED_MODULE_4__.guidedTourSearchPopup);\n                console.log(\"Search popup walkthrough steps:\", _joyride_tour_searchpopup__WEBPACK_IMPORTED_MODULE_4__.guidedTourSearchPopup);\n            } else {\n                setSteps(_joyride_tour_main__WEBPACK_IMPORTED_MODULE_3__.guidedTourMain);\n                console.log(\"Main walkthrough steps:\", _joyride_tour_main__WEBPACK_IMPORTED_MODULE_3__.guidedTourMain);\n            }\n            console.log(\"isSearchPopupVisible:\", isSearchPopupVisible);\n        } else {\n            setRun(false); // Disable the walkthrough for other pages\n        }\n    }, [\n        router.pathname,\n        isSearchPopupVisible\n    ]);\n    const toggleSearchPopupVisibility = ()=>{\n        setIsSearchPopupVisible((prev)=>!prev);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WalkthroughContext.Provider, {\n        value: {\n            run,\n            setRun,\n            stepIndex,\n            setStepIndex,\n            steps,\n            toggleSearchPopupVisibility,\n            isSearchPopupVisible\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\1.DATA\\\\Project_15mincity\\\\frontend 15min-city-FE\\\\src\\\\contexts\\\\WalkthroughContext.js\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, undefined);\n};\nconst useWalkthrough = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(WalkthroughContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvV2Fsa3Rocm91Z2hDb250ZXh0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQThFO0FBQ3RDO0FBQ2M7QUFDYztBQUVwRSxNQUFNUSxtQ0FBcUJQLG9EQUFhQTtBQUVqQyxNQUFNUSxzQkFBc0IsQ0FBQyxFQUFFQyxTQUFRLEVBQUUsR0FBSztJQUNuRCxNQUFNLENBQUNDLEtBQUtDLE9BQU8sR0FBR1QsK0NBQVFBLENBQUMsS0FBSyxHQUFJLDhDQUE4QztJQUN0RixNQUFNLENBQUNVLFdBQVdDLGFBQWEsR0FBR1gsK0NBQVFBLENBQUM7SUFDM0MsTUFBTSxDQUFDWSxPQUFPQyxTQUFTLEdBQUdiLCtDQUFRQSxDQUFDLEVBQUU7SUFDckMsTUFBTSxDQUFDYyxzQkFBc0JDLHdCQUF3QixHQUFHZiwrQ0FBUUEsQ0FBQyxLQUFLO0lBQ3RFLE1BQU1nQixTQUFTZCxzREFBU0E7SUFFeEJELGdEQUFTQSxDQUFDLElBQU07UUFDZCxJQUFJZSxPQUFPQyxRQUFRLEtBQUssS0FBSztZQUMzQlIsT0FBTyxJQUFJLEdBQUkseUJBQXlCO1lBQ3hDLElBQUlLLHNCQUFzQjtnQkFDeEJELFNBQVNULDRFQUFxQkE7Z0JBQzlCYyxRQUFRQyxHQUFHLENBQUMsbUNBQW1DZiw0RUFBcUJBO1lBQ3RFLE9BQU87Z0JBQ0xTLFNBQVNWLDhEQUFjQTtnQkFDdkJlLFFBQVFDLEdBQUcsQ0FBQywyQkFBMkJoQiw4REFBY0E7WUFDdkQsQ0FBQztZQUNEZSxRQUFRQyxHQUFHLENBQUMseUJBQXlCTDtRQUN2QyxPQUFPO1lBQ0xMLE9BQU8sS0FBSyxHQUFJLDBDQUEwQztRQUM1RCxDQUFDO0lBQ0gsR0FBRztRQUFDTyxPQUFPQyxRQUFRO1FBQUVIO0tBQXFCO0lBRTFDLE1BQU1NLDhCQUE4QixJQUFNO1FBQ3hDTCx3QkFBd0IsQ0FBQ00sT0FBUyxDQUFDQTtJQUNyQztJQUVBLHFCQUNFLDhEQUFDaEIsbUJBQW1CaUIsUUFBUTtRQUFDQyxPQUFPO1lBQUVmO1lBQUtDO1lBQVFDO1lBQVdDO1lBQWNDO1lBQU9RO1lBQTZCTjtRQUFxQjtrQkFDbElQOzs7Ozs7QUFHUCxFQUFFO0FBRUssTUFBTWlCLGlCQUFpQixJQUFNekIsaURBQVVBLENBQUNNLG9CQUFvQiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqczEzLXNpZGViYXItZXhhbXBsZS8uL3NyYy9jb250ZXh0cy9XYWxrdGhyb3VnaENvbnRleHQuanM/M2JlNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB7IGd1aWRlZFRvdXJNYWluIH0gZnJvbSAnLi4vam95cmlkZS90b3VyLW1haW4nO1xuaW1wb3J0IHsgZ3VpZGVkVG91clNlYXJjaFBvcHVwIH0gZnJvbSAnLi4vam95cmlkZS90b3VyLXNlYXJjaHBvcHVwJztcblxuY29uc3QgV2Fsa3Rocm91Z2hDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgY29uc3QgV2Fsa3Rocm91Z2hQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW3J1biwgc2V0UnVuXSA9IHVzZVN0YXRlKGZhbHNlKTsgIC8vIEluaXRpYWxpemUgYXMgZmFsc2UgdG8gcHJldmVudCBhdXRvLXJ1bm5pbmdcbiAgY29uc3QgW3N0ZXBJbmRleCwgc2V0U3RlcEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbc3RlcHMsIHNldFN0ZXBzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2lzU2VhcmNoUG9wdXBWaXNpYmxlLCBzZXRJc1NlYXJjaFBvcHVwVmlzaWJsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJvdXRlci5wYXRobmFtZSA9PT0gJy8nKSB7ICAvLyBDaGVjayBpZiB0aGUgY3VycmVudCBwYXRoIGlzIHRoZSBtYWluIHBhZ2VcbiAgICAgIHNldFJ1bih0cnVlKTsgIC8vIEVuYWJsZSB0aGUgd2Fsa3Rocm91Z2hcbiAgICAgIGlmIChpc1NlYXJjaFBvcHVwVmlzaWJsZSkge1xuICAgICAgICBzZXRTdGVwcyhndWlkZWRUb3VyU2VhcmNoUG9wdXApO1xuICAgICAgICBjb25zb2xlLmxvZygnU2VhcmNoIHBvcHVwIHdhbGt0aHJvdWdoIHN0ZXBzOicsIGd1aWRlZFRvdXJTZWFyY2hQb3B1cCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTdGVwcyhndWlkZWRUb3VyTWFpbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNYWluIHdhbGt0aHJvdWdoIHN0ZXBzOicsIGd1aWRlZFRvdXJNYWluKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCdpc1NlYXJjaFBvcHVwVmlzaWJsZTonLCBpc1NlYXJjaFBvcHVwVmlzaWJsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFJ1bihmYWxzZSk7ICAvLyBEaXNhYmxlIHRoZSB3YWxrdGhyb3VnaCBmb3Igb3RoZXIgcGFnZXNcbiAgICB9XG4gIH0sIFtyb3V0ZXIucGF0aG5hbWUsIGlzU2VhcmNoUG9wdXBWaXNpYmxlXSk7XG5cbiAgY29uc3QgdG9nZ2xlU2VhcmNoUG9wdXBWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgIHNldElzU2VhcmNoUG9wdXBWaXNpYmxlKChwcmV2KSA9PiAhcHJldik7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8V2Fsa3Rocm91Z2hDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHJ1biwgc2V0UnVuLCBzdGVwSW5kZXgsIHNldFN0ZXBJbmRleCwgc3RlcHMsIHRvZ2dsZVNlYXJjaFBvcHVwVmlzaWJpbGl0eSwgaXNTZWFyY2hQb3B1cFZpc2libGUgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9XYWxrdGhyb3VnaENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlV2Fsa3Rocm91Z2ggPSAoKSA9PiB1c2VDb250ZXh0KFdhbGt0aHJvdWdoQ29udGV4dCk7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUm91dGVyIiwiZ3VpZGVkVG91ck1haW4iLCJndWlkZWRUb3VyU2VhcmNoUG9wdXAiLCJXYWxrdGhyb3VnaENvbnRleHQiLCJXYWxrdGhyb3VnaFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJydW4iLCJzZXRSdW4iLCJzdGVwSW5kZXgiLCJzZXRTdGVwSW5kZXgiLCJzdGVwcyIsInNldFN0ZXBzIiwiaXNTZWFyY2hQb3B1cFZpc2libGUiLCJzZXRJc1NlYXJjaFBvcHVwVmlzaWJsZSIsInJvdXRlciIsInBhdGhuYW1lIiwiY29uc29sZSIsImxvZyIsInRvZ2dsZVNlYXJjaFBvcHVwVmlzaWJpbGl0eSIsInByZXYiLCJQcm92aWRlciIsInZhbHVlIiwidXNlV2Fsa3Rocm91Z2giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/contexts/WalkthroughContext.js\n");

/***/ }),

/***/ "./src/joyride/tour-main.js":
/*!**********************************!*\
  !*** ./src/joyride/tour-main.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"guidedTourMain\": () => (/* binding */ guidedTourMain)\n/* harmony export */ });\nconst guidedTourMain = [\n    {\n        target: \"body\",\n        content: 'Selamat Datang di Website 15 Minutes Surabaya! Konsep \"15 Minutes City\" adalah ide di mana semua kebutuhan harian Anda, seperti pekerjaan, sekolah, belanja, dan rekreasi, dapat dicapai dalam waktu 15 menit berjalan kaki atau bersepeda dari tempat tinggal Anda. Pada website ini, kalian bisa melihat titik fungsi sosial di sekitar kalian dan juga dapat mencari fungsi sosial dengan lokasi pilihan kalian.',\n        placement: \"center\",\n        disableBeacon: true\n    },\n    {\n        target: \".sidebar\",\n        content: \"Ini adalah sidebar, tempat Anda dapat mengakses berbagai kategori dan mencari tempat yang berbeda.\",\n        placement: \"right\"\n    },\n    {\n        target: \".sidebar\",\n        content: 'Klik \"Pencarian \\uD83D\\uDD0D\" jika kalian ingin mencari fungsi sosial yang berada pada lokasi tertentu. Fitur ini memungkinkan Anda untuk memasukkan lokasi dan melihat fungsi sosial di sekitarnya.',\n        placement: \"right\"\n    }\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvam95cmlkZS90b3VyLW1haW4uanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU1BLGlCQUFpQjtJQUM1QjtRQUNFQyxRQUFRO1FBQ1JDLFNBQVM7UUFDVEMsV0FBVztRQUNYQyxlQUFlLElBQUk7SUFDckI7SUFDQTtRQUNFSCxRQUFRO1FBQ1JDLFNBQVM7UUFDVEMsV0FBVztJQUNiO0lBQ0E7UUFDRUYsUUFBUTtRQUNSQyxTQUFTO1FBQ1RDLFdBQVc7SUFDYjtDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMxMy1zaWRlYmFyLWV4YW1wbGUvLi9zcmMvam95cmlkZS90b3VyLW1haW4uanM/NDFlZiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ3VpZGVkVG91ck1haW4gPSBbXG4gIHtcbiAgICB0YXJnZXQ6ICdib2R5JyxcbiAgICBjb250ZW50OiAnU2VsYW1hdCBEYXRhbmcgZGkgV2Vic2l0ZSAxNSBNaW51dGVzIFN1cmFiYXlhISBLb25zZXAgXCIxNSBNaW51dGVzIENpdHlcIiBhZGFsYWggaWRlIGRpIG1hbmEgc2VtdWEga2VidXR1aGFuIGhhcmlhbiBBbmRhLCBzZXBlcnRpIHBla2VyamFhbiwgc2Vrb2xhaCwgYmVsYW5qYSwgZGFuIHJla3JlYXNpLCBkYXBhdCBkaWNhcGFpIGRhbGFtIHdha3R1IDE1IG1lbml0IGJlcmphbGFuIGtha2kgYXRhdSBiZXJzZXBlZGEgZGFyaSB0ZW1wYXQgdGluZ2dhbCBBbmRhLiBQYWRhIHdlYnNpdGUgaW5pLCBrYWxpYW4gYmlzYSBtZWxpaGF0IHRpdGlrIGZ1bmdzaSBzb3NpYWwgZGkgc2VraXRhciBrYWxpYW4gZGFuIGp1Z2EgZGFwYXQgbWVuY2FyaSBmdW5nc2kgc29zaWFsIGRlbmdhbiBsb2thc2kgcGlsaWhhbiBrYWxpYW4uJyxcbiAgICBwbGFjZW1lbnQ6ICdjZW50ZXInLFxuICAgIGRpc2FibGVCZWFjb246IHRydWUsXG4gIH0sXG4gIHtcbiAgICB0YXJnZXQ6ICcuc2lkZWJhcicsXG4gICAgY29udGVudDogJ0luaSBhZGFsYWggc2lkZWJhciwgdGVtcGF0IEFuZGEgZGFwYXQgbWVuZ2Frc2VzIGJlcmJhZ2FpIGthdGVnb3JpIGRhbiBtZW5jYXJpIHRlbXBhdCB5YW5nIGJlcmJlZGEuJyxcbiAgICBwbGFjZW1lbnQ6ICdyaWdodCcsXG4gIH0sXG4gIHtcbiAgICB0YXJnZXQ6ICcuc2lkZWJhcicsXG4gICAgY29udGVudDogJ0tsaWsgXCJQZW5jYXJpYW4g8J+UjVwiIGppa2Ega2FsaWFuIGluZ2luIG1lbmNhcmkgZnVuZ3NpIHNvc2lhbCB5YW5nIGJlcmFkYSBwYWRhIGxva2FzaSB0ZXJ0ZW50dS4gRml0dXIgaW5pIG1lbXVuZ2tpbmthbiBBbmRhIHVudHVrIG1lbWFzdWtrYW4gbG9rYXNpIGRhbiBtZWxpaGF0IGZ1bmdzaSBzb3NpYWwgZGkgc2VraXRhcm55YS4nLFxuICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgfVxuXTtcbiJdLCJuYW1lcyI6WyJndWlkZWRUb3VyTWFpbiIsInRhcmdldCIsImNvbnRlbnQiLCJwbGFjZW1lbnQiLCJkaXNhYmxlQmVhY29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/joyride/tour-main.js\n");

/***/ }),

/***/ "./src/joyride/tour-searchpopup.js":
/*!*****************************************!*\
  !*** ./src/joyride/tour-searchpopup.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"guidedTourSearchPopup\": () => (/* binding */ guidedTourSearchPopup)\n/* harmony export */ });\n// joyride/tour-searchpopup.js\nconst guidedTourSearchPopup = [\n    {\n        target: \".searchmode\",\n        content: \"Kalian bisa memilih antara radius 15 menit berjalan kaki atau bersepeda\",\n        placement: \"right\"\n    }\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvam95cmlkZS90b3VyLXNlYXJjaHBvcHVwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSw4QkFBOEI7QUFDdkIsTUFBTUEsd0JBQXdCO0lBQ25DO1FBQ0VDLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxXQUFXO0lBQ2I7Q0FDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzMTMtc2lkZWJhci1leGFtcGxlLy4vc3JjL2pveXJpZGUvdG91ci1zZWFyY2hwb3B1cC5qcz8xODRhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGpveXJpZGUvdG91ci1zZWFyY2hwb3B1cC5qc1xuZXhwb3J0IGNvbnN0IGd1aWRlZFRvdXJTZWFyY2hQb3B1cCA9IFtcbiAge1xuICAgIHRhcmdldDogJy5zZWFyY2htb2RlJyxcbiAgICBjb250ZW50OiAnS2FsaWFuIGJpc2EgbWVtaWxpaCBhbnRhcmEgcmFkaXVzIDE1IG1lbml0IGJlcmphbGFuIGtha2kgYXRhdSBiZXJzZXBlZGEnLFxuICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgfVxuXTtcbiJdLCJuYW1lcyI6WyJndWlkZWRUb3VyU2VhcmNoUG9wdXAiLCJ0YXJnZXQiLCJjb250ZW50IiwicGxhY2VtZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/joyride/tour-searchpopup.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"src\\\\pages\\\\_app.js\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"inter\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"src\\\\\\\\pages\\\\\\\\_app.js\\\",\\\"import\\\":\\\"Inter\\\",\\\"arguments\\\":[{\\\"subsets\\\":[\\\"latin\\\"]}],\\\"variableName\\\":\\\"inter\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_WalkthroughContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/WalkthroughContext */ \"./src/contexts/WalkthroughContext.js\");\n// pages/_app.js\n\n\n\n\nfunction App({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_WalkthroughContext__WEBPACK_IMPORTED_MODULE_2__.WalkthroughProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: (next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default().className),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\1.DATA\\\\Project_15mincity\\\\frontend 15min-city-FE\\\\src\\\\pages\\\\_app.js\",\n                lineNumber: 12,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\1.DATA\\\\Project_15mincity\\\\frontend 15min-city-FE\\\\src\\\\pages\\\\_app.js\",\n            lineNumber: 11,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\1.DATA\\\\Project_15mincity\\\\frontend 15min-city-FE\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGdCQUFnQjs7QUFLVkE7QUFKd0I7QUFFdUM7QUFJdEQsU0FBU0UsSUFBSSxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRSxFQUFFO0lBQ3BELHFCQUNFLDhEQUFDSCw2RUFBbUJBO2tCQUNsQiw0RUFBQ0k7WUFBS0MsV0FBV04sNkpBQWU7c0JBQzlCLDRFQUFDRztnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FBSWhDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMxMy1zaWRlYmFyLWV4YW1wbGUvLi9zcmMvcGFnZXMvX2FwcC5qcz84ZmRhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL19hcHAuanNcbmltcG9ydCAnQC9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuaW1wb3J0IHsgSW50ZXIgfSBmcm9tICduZXh0L2ZvbnQvZ29vZ2xlJztcbmltcG9ydCB7IFdhbGt0aHJvdWdoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9XYWxrdGhyb3VnaENvbnRleHQnO1xuXG5jb25zdCBpbnRlciA9IEludGVyKHsgc3Vic2V0czogWydsYXRpbiddIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPFdhbGt0aHJvdWdoUHJvdmlkZXI+XG4gICAgICA8bWFpbiBjbGFzc05hbWU9e2ludGVyLmNsYXNzTmFtZX0+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvbWFpbj5cbiAgICA8L1dhbGt0aHJvdWdoUHJvdmlkZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiaW50ZXIiLCJXYWxrdGhyb3VnaFByb3ZpZGVyIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwibWFpbiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();