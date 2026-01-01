import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs as typescriptEslintConfigs } from 'typescript-eslint';
import { configs as angularEslintConfigs, processInlineTemplates } from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

/**
 * ESLint設定ファイル
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @type {import('eslint').Linter.Config[]}
 */
export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      typescriptEslintConfigs.recommended,
      typescriptEslintConfigs.stylistic,
      angularEslintConfigs.tsRecommended,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ],
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports
    },
    processor: processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.jsの組込モジュール
            'external', // 外部モジュール
            'internal', // 自作モジュール
            'parent', // 親階層のファイル
            'sibling', // 同階層のファイル
            'index' // 同階層のindexファイル
          ],
          'newlines-between': 'always', // グループ間に空行を挿入する
          // インポートをアルファベット順にソートする
          alphabetize: {
            order: 'asc', // 昇順でソート
            caseInsensitive: true // 大文字小文字を区別しない
          },
          // 特定のパターンのインポートに対してグループを指定
          pathGroups: [
            {
              pattern: '@angular**', // @angular で始まるモジュール
              group: 'external', // external グループに分類
              position: 'before' // グループの最前に配置
            }
          ]
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off' // 二重にエラーが表示されるのでOFFにする
    }
  },
  {
    files: ['**/*.html'],
    extends: [angularEslintConfigs.templateRecommended, angularEslintConfigs.templateAccessibility],
    rules: {}
  },
  {
    files: ['**/*.html'],
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'angular'
        }
      ]
    }
  }
]);
