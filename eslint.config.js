import base from '@forvais/eslint-config-base';
import ts from '@forvais/eslint-config-typescript';

/**
 *  @type {import("eslint").Linter.Config[]}
  */
export default [
  ...base,
  ...ts,
];
