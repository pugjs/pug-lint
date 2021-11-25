const fs = require('fs');
const path = require('path');
const glob = require('glob');
const stripJSONComments = require('strip-json-comments');

const configs = [
	'.pug-lintrc',
	'.pug-lintrc.js',
	'.pug-lintrc.json',
	'.pug-lint.json',
	'.jade-lintrc',
	'.jade-lint.json',
	'package.json'
];

exports.getContent = function (config, directory) {
	if (!config) {
		return;
	}

	const configPath = path.resolve(directory, config);
	const content = this.loadFromFile(configPath);

	config = path.basename(config);

	return content && config === 'package.json'
		? content.pugLintConfig || content.jadeLintConfig
		: content;
};

exports.getReporter = function (reporter) {
	let writerPath;
	let writer;

	if (reporter) {
		reporter = reporter.toString();
		writerPath = path.resolve(process.cwd(), reporter);

		if (!fs.existsSync(writerPath)) {
			writerPath = path.resolve(__dirname, './reporters/' + reporter);
		}
	}

	try {
		writer = require(writerPath);
	} catch (error) {
		writer = null;
	}

	if (!writer) {
		try {
			writer = require(reporter);
		} catch (error) {}
	}

	return { path: writerPath, writer };
};

exports.load = function (config, cwd) {
	const directory = cwd || process.cwd();

	if (config) {
		return this.getContent(config, directory);
	}

	const content = this.getContent(
		findup(configs, { nocase: true, cwd: directory }, (configPath) => {
			if (path.basename(configPath) === 'package.json') {
				return Boolean(this.getContent(configPath));
			}

			return true;
		})
	);

	if (content) {
		return content;
	}

	return this.loadFromHomeDirectory();
};

exports.loadFromFile = function (configPath) {
	let content;
	let ext;

	if (fs.existsSync(configPath)) {
		ext = path.extname(configPath);

		content =
			ext === '.js'
				? require(configPath)
				: JSON.parse(
						stripJSONComments(fs.readFileSync(configPath, 'utf8'))
				  );

		content.configPath = configPath;
	}

	return content;
};

exports.loadFromHomeDirectory = function () {
	const directoryArray = [
		process.env.USERPROFILE,
		process.env.HOMEPATH,
		process.env.HOME
	];

	for (const directory of directoryArray) {
		/* istanbul ignore if */
		if (!directory) {
			continue;
		}

		for (const config of configs) {
			const content = this.getContent(config, directory);

			/* istanbul ignore if */
			if (content) {
				return content;
			}
		}
	}
};

function findup(patterns, options, fn) {
	let lastpath;
	let file;

	options = Object.create(options);
	options.maxDepth = 1;
	options.cwd = path.resolve(options.cwd);

	do {
		file = patterns.find(filterPatterns);

		if (file) {
			return path.join(options.cwd, file);
		}

		lastpath = options.cwd;
		options.cwd = path.resolve(options.cwd, '..');
	} while (options.cwd !== lastpath);

	function filterPatterns(pattern) {
		const configPath = glob.sync(pattern, options)[0];

		if (configPath) {
			return fn(path.join(options.cwd, configPath));
		}
	}
}
