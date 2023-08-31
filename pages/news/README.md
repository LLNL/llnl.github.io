# News Posts

News posts appear on the [News](https://software.llnl.gov/news/), [Events](https://software.llnl.gov/news/events/), and [Archive](https://software.llnl.gov/news/archive/) pages in reverse chronological order (i.e., newest first). The list is curated to promote LLNL's open source endeavors and community engagement. Posts should be tagged with at least one of the following categories, which are not associated with the [catalog topics](https://github.com/LLNL/llnl.github.io/tree/main/category) applied to repos:

- `event` - announcement or recap of an event/conference
- `multimedia` - synopsis of a video or podcast published on another platform (e.g., YouTube)
- `new-repo` - announcement of new repo added to LLNL's software catalog
- `release` - announcement of substantial software release (i.e., more than bug fixes)
- `story` - synopsis of a relevant news or research-focused article; profile of a developer

Categories should appear alphabetically in each post's frontmatter under the title, with no punctuation between multiple categories:

```bash
title: "Title of Post"
categories: new-repo story
```

LLNL's [.github repo](https://github.com/LLNL/.github/tree/main/news-templates) contains .md templates for each of these types of posts. For posts that combine multiple tags (e.g., multimedia, event), a combination of templates may be used. File naming conventions are also provided.
