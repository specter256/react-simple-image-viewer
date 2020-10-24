"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div `
  z-index: 1;
  display: flex;
  align-items: center;
  position: fixed;
  padding: 0px 60px 0px 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  box-sizing: border-box;
`;
exports.Content = styled_components_1.default.div `
  margin: auto;
  padding: 0;
  width: 90%;
  height: 100%;
  max-height: 100%;
  text-align: center;
`;
exports.Slide = styled_components_1.default.div `
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
exports.Image = styled_components_1.default.img `
  max-height: 100%;
  max-width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;
exports.Close = styled_components_1.default.span `
  color: white;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 40px;
  font-weight: bold;
  opacity: .2;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
exports.Navigation = styled_components_1.default.span `
  height: 80%;
  color: white;
  cursor: pointer;
  position: absolute;
  font-size: 60px;
  line-height: 60px;
  font-weight: bold;
  display: flex;
  align-items: center;
  opacity: .2;
  padding: 0 15px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;

  &:hover {
    opacity: 1;
  }
`;
exports.Prev = styled_components_1.default(exports.Navigation) `
  left: 0;
`;
exports.Next = styled_components_1.default(exports.Navigation) `
  right: 0;
`;
//# sourceMappingURL=styles.js.map