var mkdirp = require('mkdirp');
var fs = require('fs');
var https = require('https');

var ghost = require('./' + process.argv[2]);
var data = ghost.db[0].data;

var conf = {
    out: 'out/'
};

//build tags lookup
var lookup = {};
for (var i=0; i<data.posts_tags.length; i++) {
    var bridge = data.posts_tags[i];
    var post_id = bridge.post_id;
    var tag_id = bridge.tag_id;

    // maybe initialise lookup for this post_id
    if (!lookup[post_id]) {
        lookup[post_id] = [];
    }

    for (var j=0; j<data.tags.length; j++) {
        var tag = data.tags[j];
        if (tag.id === tag_id) {
            lookup[post_id].push(tag.slug);
        }
    }
}

function dirFrom(pub) {
    var root = '_drafts';
    if (pub) {
        root = pub.substr(0, pub.indexOf('T')).replace(/-/g, '/');
    }
    return root + '/';
}

function download(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

for (var i=0; i<data.posts.length; i++) {
    var post = data.posts[i];

    var tags = '';
    if (lookup[post.id]) {
        tags = lookup[post.id].join(' ');
        // tags to skip on
        if (tags.indexOf('noise') > -1) {
            continue;
        }
    }

    var out = '';
    out += 'title: ' + post.title;
    out += '\ndescription: ' + post.meta_description;
    out += '\nlayout: post';
    out += '\ntags: ' + tags;
    out += '\ncategory: blog';
    out += '\n--';
    out += '\n';
    out += '\n';
    out += post.markdown;
    out += '\n';

    var outDir = conf.out + dirFrom(post.published_at);
    mkdirp.sync(outDir);

    var outFile = post.slug + '.md';
    fs.writeFile(outDir + outFile, out, function(err) {
        if(err) {
            return console.log(err, post);
        }
    });

    // download images
    if (out.indexOf("content/images") > -1) {
        var re = /(\/content\/images\/.*\/)(.*)\)/g;
        var m;
        do {
            m = re.exec(out);
            if (m) {
                console.log(m[1], m[2]);

                download('https://opyate.com' + m[1], outDir + m[2]);
            }
        } while (m);
    }
}
