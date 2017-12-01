
Some examples from the Ghost JSON below.

# Post


```
cat opyate-com.ghost.2017-11-28.json| jq '.db[].data.posts[0]'
```


```
{
  "id": 3,
  "uuid": "05fccd6b-054a-47a5-8225-5499c17f1aed",
  "title": "I'm in deep trouble",
  "slug": "im-in-deep-trouble",
  "markdown": "I'm a contractor programmer. I'm also an artist at heart. \n\nI fed the programmer but starved the artist.\n\nHere's a tab I have open in my browser right now:\n\n==My first Angular 2 app.==\n\nSome client wants me to implement their app-that-doesn't-really-matter using the new hotness.\n\n&lt;lots of redacted content, akin to a small dirty bomb going off right here in your web browser&gt;\n\nLet's just say in the friendliest words possible that I can't be bothered to learn a new JavaScript *thing*.\n\nInstead, I'm trying to find a way out of this mess so I can do more doodling. Without starving my family.\n\nMy brain is kicking its heels in. Like I said: deep trouble.",
  "mobiledoc": null,
  "html": "<p>I'm a contractor programmer. I'm also an artist at heart. </p>\n\n<p>I fed the programmer but starved the artist.</p>\n\n<p>Here's a tab I have open in my browser right now:</p>\n\n<p><mark>My first Angular 2 app.</mark></p>\n\n<p>Some client wants me to implement their app-that-doesn't-really-matter using the new hotness.</p>\n\n<p>&lt;lots of redacted content, akin to a small dirty bomb going off right here in your web browser&gt;</p>\n\n<p>Let's just say in the friendliest words possible that I can't be bothered to learn a new JavaScript <em>thing</em>.</p>\n\n<p>Instead, I'm trying to find a way out of this mess so I can do more doodling. Without starving my family.</p>\n\n<p>My brain is kicking its heels in. Like I said: deep trouble.</p>",
  "amp": null,
  "image": null,
  "featured": 0,
  "page": 0,
  "status": "draft",
  "language": "en_US",
  "visibility": "public",
  "meta_title": null,
  "meta_description": null,
  "author_id": 1,
  "created_at": "2016-10-20T20:19:21.000Z",
  "created_by": 1,
  "updated_at": "2017-08-06T19:56:52.000Z",
  "updated_by": 1,
  "published_at": "2016-10-20T20:56:53.000Z",
  "published_by": 1
}
```

# Post->tag

```
cat opyate-com.ghost.2017-11-28.json| jq '.db[].data.posts_tags[0]'
```

```
{
  "id": 5,
  "post_id": 39,
  "tag_id": 4,
  "sort_order": 0
}
```

# Tag

```
cat opyate-com.ghost.2017-11-28.json| jq '.db[].data.tags[0]'
```

```
{
  "id": 4,
  "uuid": "813d62c9-48ce-427f-a401-55c34e4e25e0",
  "name": "plato-long",
  "slug": "plato-long",
  "description": null,
  "image": null,
  "parent_id": null,
  "visibility": "public",
  "meta_title": null,
  "meta_description": null,
  "created_at": "2016-10-26T14:14:42.000Z",
  "created_by": 1,
  "updated_at": "2016-10-26T14:14:42.000Z",
  "updated_by": 1
}
```
