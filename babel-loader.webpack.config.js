import jsonfile from 'jsonfile';

const babelrc = jsonfile.readFileSync('.babelrc');

const blacklistedPresets = [
    'es2015',
    'es2016',
    'es2017',
    'es2018',
    'latest',
    'env',
];

export default DEV_MODE => {

    const presets = [
        ['env', {
            modules: false,
            loose: true,
        }],
        ...babelrc.presets.filter(name => !blacklistedPresets.includes(name)),
    ];

    const plugins = [
        ...babelrc.plugins,
        ...!DEV_MODE ? [] : [
            'transform-react-jsx-source',
            'transform-react-jsx-self',
        ],
    ];


    return {
        cacheDirectory: DEV_MODE,
        babelrc: false,
        presets,
        plugins,
    }
}
