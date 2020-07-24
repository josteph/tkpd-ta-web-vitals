module.exports = {
  extends: ['react-app'],
  parser: 'babel-eslint',
  env: {
    amd: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    __DEV__: true,
    __PROD__: true,
    __TEST__: true,
    __DEVTOOLS__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __BUILDVER__: true,
    expect: true,
  },
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      generators: false,
      jsx: true,
      legacyDecorators: true,
      objectLiteralDuplicateProperties: false,
    },
  },
  plugins: [
    'import',
    'jsx-a11y',
    'prettier',
    'react',
    'react-hooks',
    'flowtype',
    'jest',
    'jest-dom',
    'testing-library',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    // Although this is handled by Prettier, unexpected multi-line can cause problem with automatic semicolon insertion (ASI), which may lead to bug, so this rule is still activated. Auto-format by Prettier should auto-fix most "unexpected multiline" cases.
    'no-unexpected-multiline': 'error',

    // Unreachable code may indicate typo or unfinished refactor. Both causes maintenance burden.
    'no-unreachable': 'error',

    // Control flow statement (such as "return") inside `finally` may work not as expected.
    'no-unsafe-finally': 'error',

    // Unsafe negation may lead to bug.
    'no-unsafe-negation': 'error',

    'no-unused-expressions': ['error', { allowTaggedTemplates: true, allowShortCircuit: true }],

    // Unused code will increase maintenance burden.
    'no-unused-labels': 'error',

    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],

    'no-useless-catch': 'off',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'off',

    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: [],
        object: [],
        area: [],
        'input[type="image"]': [],
      },
    ],
    'jsx-a11y/anchor-has-content': ['error', { components: [] }],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': ['error', { ignoreNonDom: false }],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': ['error', { components: [''] }],
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'both',
        depth: 25,
      },
    ],
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': [
      'error',
      {
        audio: [],
        video: [],
        track: [],
      },
    ],
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': [
      'error',
      {
        elements: ['marquee', 'blink'],
      },
    ],
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: [],
        roles: ['tabpanel'],
      },
    ],
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',

    'prettier/prettier': 'error',

    'react/button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: false,
      },
    ],
    'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: false }],
    'react/display-name': 'off',
    'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['any', 'array'],
        checkContextTypes: true,
        checkChildContextTypes: true,
      },
    ],
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',

    // setState in `componentDidMount` usually is used in server-rendering.
    'react/no-did-mount-set-state': 'off',
    // No setState in `componentWillUpdate` because `cWU` is supposed to be idempotent.
    'react/no-will-update-set-state': 'error',
    // Make sure developer don't forget to put condition in `componentDidUpdate` so the component doesn't re-render infinitely.
    'react/no-did-update-set-state': 'off',

    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'off',
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],
    'react/prefer-es6-class': ['error', 'always'],
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-default-props': [
      'error',
      {
        forbidDefaultForRequired: true,
      },
    ],
    'react/require-render-return': 'error',

    // For styling only. When debugging or developing, non-self closing component may even be preferred because developer only need to change fewer things.
    'react/self-closing-comp': 'off',

    'react/sort-prop-types': [
      'error',
      {
        ignoreCase: true,
        callbacksLast: true,
        requiredFirst: false,
        sortShapeProp: true,
      },
    ],
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',

    // `test` and `it` helps communicate developer intention. Developer should use the best for each context and case.
    'jest/consistent-test-it': 'off',

    // Some utility such as `getByText` from `@testing-library/react` implicitly asserts so you may have test without `expect`. But it can also mean you forgot to write `expect` (the test will PASS).
    'jest/expect-expect': 'warn',

    // Test name communicates developer intention. Developer should use uppercase or lowercase as needed.
    'jest/lowercase-name': 'off',

    // Enforcing not using alias hinders more than helps.
    'jest/no-alias-methods': 'off',

    // Important to prevent developers accidentally disabling test case permanently after debugging test.
    'jest/no-commented-out-tests': 'error',

    // Important to prevent developers accidentally disabling test case permanently after debugging test.
    'jest/no-disabled-tests': 'error',

    // We need to fork this rule because we use `_if`, custom alias for `describe`.
    'jest/no-duplicate-hooks': 'error',

    // All tests in an exported test file will be run on import. If you need to import some utility written inside a test file, move it to `__utils__` (outside `__tests__`).
    // Export is allowed as long as the test is wrapped under a function
    'jest/no-export': 'off',

    // Important to prevent developers accidentally disabling test case permanently after debugging test.
    'jest/no-focused-tests': 'error',

    // Jest hooks is tool. Use what tool best for your case and need.
    'jest/no-hooks': 'off',

    // Test title tells people what use-case or test case is being tested. Identical title will confuse people.
    'jest/no-identical-title': 'error',

    // `if` inside test body may indicate you are trying to test multiple use-cases in 1 test case. Separate them into their own test case instead. If you need `if` to satisfy Typescript checker, use `!` operator.
    'jest/no-if': 'warn',

    // Jasmine globals are not part of Jest public API. Do not use things that is not part of public API.
    'jest/no-jasmine-globals': 'error',

    // Importing `jest` is unnecessary. Jest already ensure its globals are available in the test.
    'jest/no-jest-import': 'warn',

    // Large snapshot is hard to read and review. Reviewer tends to end up with "looks good did not read" which is not good.
    'jest/no-large-snapshots': 'warn',

    // Ideally we should not need to import mock manually because Jest can use mock without we need to manually import it. Unfortunately, bug https://github.com/facebook/jest/issues/2070 may make us need to manually import mock. Set this rule to `error` after that bug is resolved.
    'jest/no-mocks-import': 'off',

    // Prevent developers mistyped `expect` outside a test case when it should be written inside the test case.
    'jest/no-standalone-expect': 'error',

    // Although Callback pattern can be replaced with Promise pattern, depending on the case, test with Promise pattern can be harder to understand.
    'jest/no-test-callback': 'off',

    // Important to prevent developers accidentally disabling test case permanently after debugging test.
    'jest/no-test-prefixes': 'error',

    // You may need to return Promise. Depending on the case, replacing Promise with async/await may cause the test harder to understand.
    'jest/no-test-return-statement': 'off',

    // Stricter type assertion is better, but you may find yourself in situation where you need to use `truthy` or `falsy`.
    'jest/no-truthy-falsy': 'off',

    // `expect` inside `catch` blocks may be skipped, which may result in false positive (your test PASS because a failed `expect` is not executed).
    'jest/no-try-expect': 'error',

    // `toBeCalledWith` and `toBeCalled` has different intention. Use the one that communicates your intention.
    'jest/prefer-called-with': 'off',

    // Enforce developer to manually write `hasAssertions` to prevent false positive (your test PASS because you forgot to add `expect`) is too laborous.
    'jest/prefer-expect-assertions': 'off',

    // Depending on your case, inline snapshot may be better tool or not. Use the one that suit your case and need.
    'jest/prefer-inline-snapshots': 'off',

    // While its nice to be able to restore mock with `mockRestore` (instead of manually restore it), technically Spy and Mock in Jest behaves differently, so they cannot really replacing each other.
    'jest/prefer-spy-on': 'off',

    // Most of the time you will want to ensure two objects not only have same data, but also have same structure. In rare case you don't need them to have same structure, feel free to use `toEqual`.
    'jest/prefer-strict-equal': 'warn',

    // It does the same and the error is more helpful for debugging.
    'jest/prefer-to-be-null': 'error',

    // It does the same and the error is more helpful for debugging.
    'jest/prefer-to-be-undefined': 'error',

    // The error is more helpful for debugging.
    'jest/prefer-to-contain': 'error',

    // It does the same and the error is more helpful for debugging.
    'jest/prefer-to-have-length': 'error',

    // Ensure developer doesn't forget to implement test.
    'jest/prefer-todo': 'error',

    'jest/valid-describe': 'error',

    // To prevent developer from forgetting to return Promise.
    'jest/valid-expect-in-promise': 'error',

    'jest/valid-expect': 'error',

    // Forgot to await may cause bug because the query method will not work as expected.
    'testing-library/await-async-query': 'error',

    // Forgot to await may cause bug because the query method will not work as expected.
    'testing-library/await-async-utils': 'error',

    // We can't make convention because it's also used by Test Engineers. And also we don't need to make convention yet.
    // 'testing-library/consistent-data-testid' : 'off',

    // To prevent useless await; not preventing bug.
    'testing-library/no-await-sync-query': 'error',

    // Necessary because "debug" left in the code will clutter error log and make debugging harder.
    'testing-library/no-debug': 'error',

    // On non-framework code, we will need to import from `@testing-library/dom`.
    'testing-library/no-dom-import': 'off',
  },
};
