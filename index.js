const fs = require('fs');
const path = require('path');

var ghost = require('./' + process.argv[2]);
var data = ghost.db[0].data;

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

for (var i=0; i<data.posts.length; i++) {
    var post = data.posts[i];

    var tags = '';
    if (lookup[post.id]) {
        tags = lookup[post.id].join(' ');
    }

    var out = '';
    out += 'title: ' + post.title;
    out += '\ndescription: ' + post.meta_description;
    out += '\nlayout: post';
    out += '\ntags: ' + tags;
    out += '\ncategory: blog';
    out += '\n--';
    out += '\n';
    out += post.markdown;
    out += '\n';

    if (out.indexOf("content/images") > -1) {
        //console.log(out);
        var df = dirFrom(post.published_at, post.slug);
        console.log(df);
    }
}
