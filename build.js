var async = require("async");
var fs = require("fs");
var glob = require("glob");
var Mustache = require("mustache");
var ncp = require("ncp");
var path = require("path");

// Capitalize a sentence
var capitalize = function(str) {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
};

// Create the output directory
try {
    if (!fs.lstatSync("build").isDirectory()) {
        throw new Error("'./build' is not a directory");
    }
}
catch (e) {
    fs.mkdirSync("build");
}

// Read the raw special pages
var headerRaw = fs.readFileSync("src/header.html").toString();
var footerRaw = fs.readFileSync("src/footer.html").toString();
var redirectRaw = fs.readFileSync("src/redirect.html").toString();

// Find all pages
var pagePaths = glob.sync("src/pages/*");
var fileNames = pagePaths.map(function(page) {
    return path.basename(page, ".html");
});
pagePaths.forEach(function(pagePath) {
    // Read the raw page
    var pageName = path.basename(pagePath, ".html");
    var pageRaw = fs.readFileSync(pagePath).toString();

    // Compute data view
    var data = {
        name: capitalize(pageName),
        header: "",
        footer: "",
        pages: fileNames.map(fileName => ({
            name: fileName,
            cname: capitalize(fileName),
            active: fileName === pageName
        }))
    };

    // Render the header and footer first
    var header = Mustache.render(headerRaw, data);
    var footer = Mustache.render(footerRaw, data);

    // Add to the data view
    data.header = header;
    data.footer = footer;

    // Render the page
    var page = Mustache.render(pageRaw, data);

    // Write to the output directory
    fs.writeFileSync("build/" + pageName + ".html", page);

    // Also write a redirect directory (/home => /home.html)
    try {
        fs.mkdirSync("build/" + pageName);
    }
    catch (e) {
    }
    fs.writeFileSync("build/" + pageName + "/index.html", redirectRaw);
});


// Copy resource folders
async.map(["css", "js", "images"],
    function(folder, callback) {
        ncp.ncp("src/" + folder, "build/" + folder, function(err) {
            callback(err);
        });
    }
);

// Copy extra folder to root
ncp.ncp("src/extra", "build");
