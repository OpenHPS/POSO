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
    await executeWidoco(
        widocoJar, 
        path.join(__dirname, `../../${version}/common/poso-common.ttl`), 
        path.join(__dirname, `../_site/${version}/common`)
    );
    fse.copySync(path.join(__dirname, `../_site/${version}/common/doc`), path.join(__dirname, `../_site/${version}/common`));
    await rmdir(path.join(__dirname, `../_site/${version}/common/doc`));
    await rmdir(path.join(__dirname, `../_site/${version}/doc`));
    console.log(chalk.yellow(`Creating Netlify rewrites ...'`));
    await createRedirects(`${version}`, "http://purl.org/poso/");
    await createRedirects(`${version}/common`, "http://purl.org/poso/common/");
}

async function downloadWidoco(version = "1.4.16") {
    return new Promise((resolve, reject) => {
        const file = path.join(__dirname, `widoco-${version}.jar`);
        if (fs.existsSync(file)) {
            return resolve(file);
        }
        console.log(chalk.yellow(`Downloading ${file} ...`));
        axios({
            url: `https://github.com/dgarijo/Widoco/releases/download/v${version}/widoco-${version}-jar-with-dependencies.jar`,
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
            -oops \
            -webVowl \
            -licensius`;
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }
            resolve(stderr || stdout);
        });
    });
}

async function createRedirects(directory, uri) {
    return new Promise((resolve) => {
        const jsonld = path.join(__dirname, `../_site/`, directory, `/ontology.jsonld`);
        const ontology = JSON.parse(fs.readFileSync(jsonld));
        let rewrites = "\n\n";
        ontology.forEach(quad => {
            let originalUri = quad['@id'];
            if (originalUri.startsWith(uri) && originalUri !== uri) {
                originalUri = originalUri.replace(uri, "");
                const newUri = `/${directory}#${originalUri}`;
                rewrites = rewrites + `/${directory}/${originalUri}\t${newUri}\n`;
            }
        });
        rewrites += "\n\n";
        fs.appendFileSync(path.join(__dirname, "../_site/_redirects"), rewrites, { flag: "a" });
        resolve();
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

module.exports = buildOntology;
