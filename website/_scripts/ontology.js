const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const { exec } = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');
const fse = require('fs-extra');

/**
 * Build the ontology
 *
 * @param {string} version Ontology version to build
 */
async function buildOntology(version = '1.0') {
    // Download widoco
    const widocoJar = await downloadWidoco();
    await rmdir(path.join(__dirname, `../_site/${version}/`));

    await executeWidoco(
        widocoJar, 
        path.join(__dirname, `../../${version}/poso.ttl`), 
        path.join(__dirname, `../_site/${version}`)
    );
    fse.copySync(path.join(__dirname, `../_site/${version}/doc`), path.join(__dirname, `../_site/${version}`));
    await rewriteLanguagePaths(path.join(__dirname, `../_site/${version}`));
    await executeWidoco(
        widocoJar, 
        path.join(__dirname, `../../${version}/common/poso-common.ttl`), 
        path.join(__dirname, `../_site/${version}/common`)
    );
    fse.copySync(path.join(__dirname, `../_site/${version}/common/doc`), path.join(__dirname, `../_site/${version}/common`));
    await rewriteLanguagePaths(path.join(__dirname, `../_site/${version}/common`));
    await rmdir(path.join(__dirname, `../_site/${version}/common/doc`));
    await rmdir(path.join(__dirname, `../_site/${version}/doc`));
}

async function downloadWidoco(version = "1.4.17") {
    return new Promise((resolve, reject) => {
        const file = path.join(__dirname, `widoco-${version}.jar`);
        if (fs.existsSync(file)) {
            return resolve(file);
        }
        console.log(chalk.yellow(`Downloading ${file} ...`));
        axios({
            url: `https://github.com/dgarijo/Widoco/releases/download/v${version}/java-17-widoco-${version}-jar-with-dependencies.jar`,
            method: 'GET',
            responseType: "stream"
        }).then(async (response) => {
            response.data.pipe(fs.createWriteStream(file)).on("finish", () => resolve(file));
        }).catch(reject);
    });
}

async function executeWidoco(file, ontologyFile, outputFolder) {
    return new Promise((resolve, reject) => {
        console.log(chalk.yellow(`Creating WIDOCO documentation for ${ontologyFile} ...`));
        const cmd = `java -jar ${file} \
            -ontFile ${ontologyFile} \
            -outFolder ${outputFolder} \
            -rewriteAll \
            -webVowl \
            -uniteSections \
            -lang en-nl \
            -getOntologyMetadata \
            -noPlaceHolderText \
            -licensius`;
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }
            resolve(stderr || stdout);
        });
    });
}

async function rmdir(dir) {
    return new Promise((resolve, reject) => {
        rimraf(dir, (err) => {
            if (err) {
                console.error(chalk.red("\t" + err));
                reject();
            }
            resolve();
        });
    });
}

async function rewriteLanguagePaths(directory, defaultLanguage = 'en') {
    // Replacement patterns
    const relativePathPattern = /(href|src?)=\"((?!http|#).*?)\"/g;
    const languagePathPattern = /href="index-([a-z]{2}?).html"/g;

    // Get index files in the directory
    const indexFiles = fs.readdirSync(directory)
        .filter(file => file.startsWith("index"));
    indexFiles.forEach(index => {
        // Language of the index file
        const language = /index-(.*?).html/g.exec(index)[1];
        const oldFilePath = path.join(directory, index);
        const newFilePath = path.join(directory, language, "index.html");
        // Create language directory
        fs.mkdirSync(path.join(directory, language));
        // Copy the file to /${language}/index.html
        fs.copyFileSync(oldFilePath, newFilePath);
        // URL rewriting in the new directory
        let contents = fs.readFileSync(newFilePath, { encoding: 'utf-8' });
        contents = contents.replace(languagePathPattern, 'href="$1/"');
        contents = contents.replace(relativePathPattern, '$1="../$2"');
        fs.writeFileSync(newFilePath, contents);

        if (defaultLanguage !== language) {
            // Remove index file if not the default language
            fs.rmSync(oldFilePath);
        } else {
            // Rename the index-*.html file to index.html
            const defaultIndex = path.join(directory, "index.html");
            fs.renameSync(oldFilePath, defaultIndex); 
            let contents = fs.readFileSync(defaultIndex, { encoding: 'utf-8' });
            contents = contents.replace(languagePathPattern, 'href="$1/"');
            fs.writeFileSync(defaultIndex, contents);
        }
    });
}  

module.exports = buildOntology;
