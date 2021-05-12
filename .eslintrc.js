module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    // "@vue/prettier"
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        // 每行最大属性数
        'vue/max-attributes-per-line': [2, {
            'singleline': 10,
            'multiline': {
                'max': 1,
                'allowFirstLine': false
            }
        }],
        'vue/name-property-casing': ['error', 'PascalCase'],
        'accessor-pairs': 2,
        'indent': [2, 4, { 'SwitchCase': 1 }], // 缩进 SwitchCase https://cloud.tencent.com/developer/section/1135626 *
        'arrow-spacing': [2, { 'before': true, 'after': true }], // 箭头函数中的箭头前后需要留空格
        'block-spacing': [2, 'always'], // 如果代码块是单行的时候，代码块内部前后需要留一个空格
        'brace-style': [2, '1tbs', { 'allowSingleLine': true }], // 大括号语法采用『1tbs』,允许单行样式
        'comma-dangle': [2, 'never'], // 在定义对象或数组时，最后一项不能加逗号
        'comma-spacing': [2, { 'before': false, 'after': true }], // 在写逗号时，逗号前面不需要加空格，而逗号后面需要添加空格
        'comma-style': [2, 'last'], // 如果逗号可以放在行首或行尾时，那么请放在行尾
        'constructor-super': 2, // 在constructor函数中，如果classes是继承其他class，那么请使用super。否者不使用super
        // 'curly': [2, 'multi-line'], // 在if-else语句中，如果if或else语句后面是多行，那么必须加大括号。如果是单行就应该省略大括号
        // 'dot-location': [2, 'property'], // 该规则规定了.应该放置的位置
        'eol-last': 2, // 文本最后不能有空行
        // 'eqeqeq': [2, 'allow-null'],  // 使用=== !== 代替== !=
        // 'generator-star-spacing': [2, { 'before': true, 'after': true }], // 该规则规定了generator函数中星号两边的空白
        'handle-callback-err': [2, 'err'], // 规定callback 如果有err参数，只能写出err 或者 error
        // 'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // 该规则规定了在对象字面量语法中，key和value之间的空白，冒号前不要空格，冒号后面需要一个空格
        'keyword-spacing': [2, { 'before': true, 'after': true }], // keyword 前后需要空格
        'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }], // 构造函数首字母大写
        'new-parens': 2, // 在使用构造函数时候，函数调用的圆括号不能够省略
        'no-array-constructor': 2, // 禁止使用Array构造函数
        'no-caller': 2, // 禁止使用arguments.caller和arguments.callee
        'no-class-assign': 2, // 禁止变量名和class名重名
        'no-cond-assign': 2, // 在条件语句中不要使用赋值语句
        'no-control-regex': 0, // 在正则表达式中禁止使用控制符（详见官网）
        'no-delete-var': 2, // 禁止使用delete删除var申明的变量
        'no-dupe-args': 2, // 函数参数禁止重名
        'no-dupe-class-members': 2, // class中的成员禁止重名
        'no-dupe-keys': 2, // 在对象字面量中，禁止使用重复的key
        'no-duplicate-case': 2, // 在switch语句中禁止重复的case
        'no-empty-character-class': 2, // 禁止使用不匹配任何字符串的正则表达式
        'no-empty-pattern': 2, // 此规则旨在标记解构结构对象和数组中的任何空模式，因此，只要遇到问题就会报告问题。 https://cloud.tencent.com/developer/section/1135684 *
        'no-eval': 2, // 禁止使用eval函数
        'no-ex-assign': 2, // 禁止对catch语句中的参数进行赋值
        'no-extend-native': 2, // 禁止扩展原生对象
        'no-extra-bind': 2, // 禁止在不必要的时候使用bind函数
        'no-extra-boolean-cast': 2, // 已经自动转换的布尔值，不要在进行强制转化
        'no-extra-parens': [2, 'functions'], // 禁止使用多余的圆括号
        'no-fallthrough': 2, // 在case语句中尽量加break，避免不必要的fallthrough错误，如果需要fall through，那么看官网
        'no-floating-decimal': 2, // 此规则旨在消除浮点小数点，并在数值有小数点但在其之前或之后缺少数字时发出警告 *
        'no-func-assign': 2, // 禁止对函数名重新赋值
        'no-implied-eval': 2, // 禁止使用类eval的函数
        'no-inner-declarations': [2, 'functions'], // *禁止在代码块中定义函数（下面的规则仅限制函数）
        'no-invalid-regexp': 2, // RegExp构造函数中禁止使用非法正则语句
        'no-irregular-whitespace': 2, // 禁止使用不规则的空白符
        'no-iterator': 2, // 禁止使用__iterator__属性
        'no-label-var': 2, // label和var申明的变量不能重名
        'no-labels': [2, { 'allowLoop': false, 'allowSwitch': false }], // 禁止使用label语句
        'no-lone-blocks': 2, // 禁止使用没有必要的嵌套代码块
        'no-mixed-spaces-and-tabs': 2, // 不要把空格和tab混用
        'no-multi-spaces': 2, // 规则旨在禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格。 *
        'no-multi-str': 2, // 该规则保证了字符串不分两行书写
        'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 1 }], // *空行不能够超过2行
        'no-native-reassign': 2, // 该规则保证了不重写原生对象。
        'no-negated-in-lhs': 2, // 在in操作符左边的操作项不能用! 例如这样写不对的：if ( !a in b)
        'no-new-object': 2, // 不要通过new Object()，来定义对象
        'no-new-require': 2, // 禁止把require方法和new操作符一起使用
        'no-new-symbol': 2, // 这个规则旨在防止Symbol与new操作符一起使用
        'no-new-wrappers': 2, // 当定义字符串、数字、布尔值就不要使用构造函数了，String、Number、Boolean
        'no-obj-calls': 2, // 禁止无意得把全局对象当函数调用了，比如下面写法错误的：Math(), JSON()
        'no-octal': 2, // 不要使用八进制的语法
        'no-octal-escape': 2, // 这个规则不允许字符串文字中的八进制转义序列 *
        'no-path-concat': 2, // 这个规则旨在防止 Node.js 中的目录路径字符串连接 错误：var fullPath = __dirname + "/foo.js";  正确：var fullPath = dirname + "/foo.js"; https://cloud.tencent.com/developer/section/1135735 *
        'no-proto': 2, // 不要使用__proto__
        'no-redeclare': 2, // 不要重复申明一个变量
        // 'no-regex-spaces': 2, // 正则表达式中不要使用空格
        'no-return-assign': [2, 'except-parens'], // return语句中不要写赋值语句
        'no-self-assign': 2, // 不要把自己赋值给自己
        'no-self-compare': 2, // 不要和自身作比较
        'no-sequences': 2, // 不要使用逗号操作符，详见官网
        'no-shadow-restricted-names': 2, // 禁止对一些关键字或者保留字进行赋值操作，比如NaN、Infinity、undefined、eval、arguments等
        'no-spaced-func': 2, // 函数调用时，圆括号前面不能有空格
        'no-sparse-arrays': 2, // 禁止使用稀疏数组
        'no-this-before-super': 2, // 在调用super之前不能使用this对象
        'no-throw-literal': 2, // 严格限制了抛出错误的类型，简单来说只能够抛出Error生成的错误。但是这条规则并不能够保证你只能够
        'no-trailing-spaces': 2, // 行末禁止加空格
        'no-undef': 2, // 禁止使用没有定义的变量，除非在／＊global＊／已经申明
        'no-undef-init': 2, // 禁止把undefined赋值给一个变量
        'no-unexpected-multiline': 2, // 禁止在不需要分行的时候使用了分行
        'no-unmodified-loop-condition': 2, // 该规则查找循环条件内的引用，然后检查这些引用的变量是否在循环中被修改 https://cloud.tencent.com/developer/section/1135772 *
        'no-unneeded-ternary': [2, { 'defaultAssignment': false }], // 禁止使用没有必要的三元操作符，因为用些三元操作符可以使用其他语句替换
        'no-unreachable': 2, // 禁止执行不到的代码
        'no-unsafe-finally': 2,
        'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }], // 没有定义了没有被使用到的变量
        'no-useless-call': 2, // 禁止在不需要使用call()或者apply()的时候使用了这两个方法
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        'no-with': 2, // 不要使用with语句
        'one-var': [2, { 'initialized': 'never' }], // *在某些场景只能使用一个var来申明变量
        'operator-linebreak': [2, 'after', {
            'overrides': {
                '?': 'before',
                ':': 'before'
            }
        }], // 在进行断行时，操作符应该放在行首还是行尾。并且还可以对某些操作符进行重写。
        'padded-blocks': [2, 'never'],
        'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }], // 使用单引号
        'semi': [2, 'always'], // 这就是分号党和非分号党关心的了
        'semi-spacing': [2, { 'before': false, 'after': true }], // 该规则规定了分号前后的空格
        // 'space-before-blocks': [2, 'always'], // *代码块前面需要加空格
        'space-before-function-paren': [2, 'never'], // 函数圆括号前面需要加空格
        'space-in-parens': [2, 'never'], // 圆括号内部不需要加空格
        'space-infix-ops': 2, // 操作符前后需要加空格
        'space-unary-ops': [2, { 'words': true, 'nonwords': false }], // 一元操作符前后是否需要加空格
        'spaced-comment': [2, 'always', {
            'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }], // 评论符号｀／*｀ ｀//｀，后面需要留一个空格
        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2, // 使用isNaN方法，而不要直接和NaN作比较
        'valid-typeof': 2, // 在使用typeof操作符时，作比较的字符串必须是合法字符串eg:'string' 'object'
        'wrap-iife': [2, 'any'], // 立即执行函数需要用圆括号包围
        'yield-star-spacing': [2, 'both'],
        'yoda': [2, 'never'], // 条件中变量写在前面，字面量写在右边
        'prefer-const': 2,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                mocha: true
            }
        }
    ]
};
