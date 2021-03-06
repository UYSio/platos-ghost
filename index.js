var mkdirp = require('mkdirp');
var fs = require('fs');
var request = require('sync-request');

var ghost = require('./' + process.argv[2]);
var data = ghost.db[0].data;

var conf = {
    out: 'out/',
    download_images: false
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
    console.log('>', url);
    var file = fs.createWriteStream(dest);
    var res = request('GET', url);
    file.write(res.getBody());
    file.end();
    console.log('<');
};

for (var i=0; i<data.posts.length; i++) {
    var post = data.posts[i];
    var md = post.markdown;

    var tags = '';
    if (lookup[post.id]) {
        tags = lookup[post.id].join(' ');
        // tags to skip on
        if (tags.indexOf('noise') > -1) {
            continue;
        }
    }
    var cutoff = md.indexOf('\n');
    // TODO this is a hack around markdown links (i.e. just avoid them ;)
    if (cutoff > md.indexOf('http')) {
        cutoff = md.indexOf('http');
    }
    if (cutoff > 45) cutoff = 45;
    var desc = post.meta_description || md.substring(0,cutoff) + "...";
    desc = desc.replace(/[^a-zA-Z0-9 '\.,:]+/g, '');

    var out = '';
    out += 'title: "' + post.title + '"';
    out += '\ndescription: "' + desc + '"';
    out += '\nlayout: post';
    out += '\ntags: ' + tags;
    out += '\ncategory: blog';
    out += '\n---';
    out += '\n';
    out += '\n';
    out += md;
    out += '\n';

    var outDir = conf.out + dirFrom(post.published_at);
    mkdirp.sync(outDir);

    var outFile = post.slug + '.md';
    fs.writeFile(outDir + outFile, out, function(err) {
        if(err) {
            console.log(err, post);
        }
    });

    // download images
    if (conf.download_images) {
        if (out.indexOf("content/images") > -1) {
            var re = /(\/content\/images\/.*\/)(.*)\)/g;
            var m;
            do {
                m = re.exec(out);
                if (m) {
                    console.log(m[1], m[2]);

                    download('https://opyate.com' + m[1] + m[2], outDir + m[2], console.log);
                }
            } while (m);
        }
    }
}
