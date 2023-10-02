# Notes

## Future Materials Science category

* Add `Materials Science` into the catalog browse by adding this code (alphabetically among the other categories) to `/visualize/github-data/category_info.json`:

        "Materials Science": {
            "title": "Materials Science",
            "hash": "MaterialsScience",
            "icon": {
                "fa": "fa-hexagon",
                "alt": "Materials Science"
            },
            "description": {
                "short": "Software supporting research in materials design, optimization, and innovation",
                "long": ""
            },
            "topics": [
                "materials",
                "materials-science"
            ]
        },

## Deprecated RADIUSS features

April 2022: <https://software.llnl.gov/radiuss/> launched via <https://github.com/llnl/radiuss>. See tasks in [issue 567](https://github.com/LLNL/llnl.github.io/issues/567). If we ever want/need to reinstate RADIUSS browsing, branding, and other features on this site, here's what to do:

* Add `RADIUSS` back into the catalog browse (i.e., to "live" on this website) by adding this code (as lines 154-168) to `/visualize/github-data/category_info.json`:

```bash
        "RADIUSS": {
            "title": "RADIUSS",
            "hash": "RADIUSS",
            "icon": {
                "path": "/assets/images/radiuss.svg",
                "alt": "RADIUSS logo"
            },
            "description": {
                "short": "Rapid Application Development via an Institutional Universal Software Stack",
                "long": ": LLNL's RADIUSS project aims to broaden usage across LLNL and the open source community of a set of libraries and tools used for HPC scientific application development."
            },
                "topics":[
                "radiuss"
            ]            
        },
```

Note that `/project/category_info_radiuss.json` is not currently being used. If it were to be reinstated, it would need its categories updated to match the latest Catalog (e.g., Docs and Tuotirals).

* Comment back in lines 31-38 in `Category.service.js`

```bash
    this.containsRadiussTopics = function(catTopics, repoTopics) {
        for (var i = 0; i < catTopics.length; i++) {
            if ($.inArray(catTopics[i], repoTopics) != -1 && $.inArray('radiuss', repoTopics) != -1) {
                return true;
            }
        }
        return false;
    };
```

* Update link/text on home page
* Update links/text on Policies & Guidelines page
* Update links/text on FAQ page
* Update relevant READMEs
* Update links/text on <https://dev.llnl.gov/radiuss/>
* Point URL alias <https://radiuss.llnl.gov> back to `/explore/#/RADIUSS` (request this of <webmaster-comp@llnl.gov>)

No changes yet, if ever:

* Policies & Guidelines are currently still on this site: <https://software.llnl.gov/about/policies/>
* RADIUSS logo (`radiuss.svg`) is still in the `/assets/` folder
